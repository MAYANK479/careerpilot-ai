const { readUsers, writeUsers } = require('../services/dataStore');

// Simple token generator (placeholder)
function generateToken() {
  return 'dummy-token';
}

exports.register = (req, res) => {
  console.log('🔹 Register endpoint hit');
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
  }
  const users = readUsers();
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ success: false, message: 'User already exists.' });
  }
  const user = { id: Date.now(), name, email, password };
  users.push(user);
  writeUsers(users);
  const token = generateToken();
  res.status(201).json({ success: true, token, user: { id: user.id, name, email } });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }
  const token = generateToken();
  res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
};
