const fs = require('fs');
const path = require('path');
const os = require('os');

const SEED_FILE = path.join(__dirname, '..', 'data', 'users.json');
const RUNTIME_FILE = process.env.VERCEL
  ? path.join(os.tmpdir(), 'careerpilot-users.json')
  : SEED_FILE;

let cachedUsers = null;

function readUsers() {
  if (cachedUsers) return cachedUsers;

  // Try reading runtime file first (persisted during container lifetime)
  if (process.env.VERCEL && fs.existsSync(RUNTIME_FILE)) {
    try {
      cachedUsers = JSON.parse(fs.readFileSync(RUNTIME_FILE, 'utf-8'));
      return cachedUsers;
    } catch (e) {
      console.warn('Could not read runtime users, falling back to seed:', e.message);
    }
  }

  // Read seed file
  try {
    if (fs.existsSync(SEED_FILE)) {
      cachedUsers = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
      return cachedUsers;
    }
  } catch (e) {
    console.error('Failed to read seed users file', e);
  }

  cachedUsers = [];
  return cachedUsers;
}

function writeUsers(users) {
  cachedUsers = users;
  try {
    fs.writeFileSync(RUNTIME_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to write users to disk, stored in memory cache:', e.message);
  }
}

module.exports = { readUsers, writeUsers };

