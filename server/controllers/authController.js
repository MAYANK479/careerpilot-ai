const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { readUsers, writeUsers } = require('../services/dataStore');

const JWT_SECRET = process.env.JWT_SECRET || 'careerpilot_super_secret_jwt_key_2026_secure';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Full name, email, and password are required.',
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long.',
    });
  }

  const users = readUsers();
  const existing = users.find(u => (u.email || '').toLowerCase() === normalizedEmail);
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'An account with this email already exists.',
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now(),
    name: trimmedName,
    email: normalizedEmail,
    password: hashedPassword,
    provider: 'local',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  const token = generateToken(newUser);
  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar || null,
    },
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const userIndex = users.findIndex(u => (u.email || '').toLowerCase() === normalizedEmail);

  if (userIndex === -1) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const user = users[userIndex];
  let isPasswordValid = false;

  // Check if hashed password matches
  if (user.password && user.password.startsWith('$2')) {
    isPasswordValid = bcrypt.compareSync(password, user.password);
  } else if (user.password === password) {
    // Backward compatibility for legacy plain text passwords in users.json
    isPasswordValid = true;
    user.password = bcrypt.hashSync(password, 10);
    users[userIndex] = user;
    writeUsers(users);
  }

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const token = generateToken(user);
  res.json({
    success: true,
    message: 'Welcome back!',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || null,
    },
  });
};

exports.googleAuth = async (req, res) => {
  const { credential, userInfo } = req.body;

  try {
    let email = '';
    let name = '';
    let picture = '';
    let googleId = '';

    if (credential && googleClient && GOOGLE_CLIENT_ID) {
      // Real Google OAuth verification
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      picture = payload.picture;
      googleId = payload.sub;
    } else if (credential) {
      // Decode JWT payload without signature verification for dev/demo if client ID not yet configured
      const decoded = jwt.decode(credential);
      if (decoded && decoded.email) {
        email = decoded.email;
        name = decoded.name || 'Google User';
        picture = decoded.picture || '';
        googleId = decoded.sub || 'google-' + Date.now();
      }
    }

    // Direct user info passed from Google sign-in modal/flow
    if (!email && userInfo && userInfo.email) {
      email = userInfo.email;
      name = userInfo.name || '';
      picture = userInfo.picture || '';
      googleId = userInfo.sub || 'google-auth-' + Date.now();
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Unable to authenticate with Google. Missing email address.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Helper to derive a human-friendly name from email if name is missing or generic
    const deriveNameFromEmail = (em) => {
      const prefix = em.split('@')[0];
      const clean = prefix.replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim();
      if (!clean) return prefix;
      return clean
        .split(/\s+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
    };

    let resolvedName = (name || '').replace(/\s*\(Google\)$/i, '').trim();
    if (!resolvedName || resolvedName === 'Google User' || resolvedName === 'Candidate') {
      resolvedName = deriveNameFromEmail(normalizedEmail);
    }

    const users = readUsers();
    let user = users.find(u => (u.email || '').toLowerCase() === normalizedEmail);

    if (user) {
      // If user supplied password in modal, check or update it
      if (userInfo?.password) {
        if (user.password && user.password.startsWith('$2')) {
          const isMatch = bcrypt.compareSync(userInfo.password, user.password);
          if (!isMatch) {
            return res.status(401).json({
              success: false,
              message: 'Incorrect password for this account. Please enter your valid password.',
            });
          }
        } else if (user.password) {
          // Upgrade legacy plain password
          if (user.password !== userInfo.password) {
            return res.status(401).json({
              success: false,
              message: 'Incorrect password for this account.',
            });
          }
          user.password = bcrypt.hashSync(userInfo.password, 10);
        } else {
          user.password = bcrypt.hashSync(userInfo.password, 10);
        }
      }

      // Update name and avatar
      if (resolvedName) user.name = resolvedName;
      if (picture && (!user.avatar || user.avatar.includes('unsplash.com'))) {
        user.avatar = picture;
      }
      user.provider = 'google';
      writeUsers(users);
    } else {
      // Create new Google user
      const userPassword = userInfo?.password
        ? bcrypt.hashSync(userInfo.password, 10)
        : bcrypt.hashSync(Math.random().toString(36), 10);

      user = {
        id: Date.now(),
        name: resolvedName,
        email: normalizedEmail,
        googleId,
        avatar: picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedName)}&background=2563EB&color=fff&bold=true`,
        provider: 'google',
        password: userPassword,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      writeUsers(users);
    }

    const token = generateToken(user);
    return res.json({
      success: true,
      message: `Welcome, ${user.name}!`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
        provider: user.provider || 'google',
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(401).json({
      success: false,
      message: 'Google authentication failed. ' + (error.message || ''),
    });
  }
};

exports.getMe = (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.user.id || (u.email || '').toLowerCase() === (req.user.email || '').toLowerCase());

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User account not found.',
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || null,
    },
  });
};
