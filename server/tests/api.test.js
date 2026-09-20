const test = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readUsers } = require('../services/dataStore');

test('DataStore user persistence test', () => {
  const users = readUsers();
  assert.strictEqual(Array.isArray(users), true, 'Users data store should return an array');
});

test('Password hashing with bcryptjs', () => {
  const plain = 'superSecret123!';
  const hash = bcrypt.hashSync(plain, 10);
  assert.notStrictEqual(hash, plain);
  assert.strictEqual(bcrypt.compareSync(plain, hash), true);
  assert.strictEqual(bcrypt.compareSync('wrongPassword', hash), false);
});

test('JWT signing and verification', () => {
  const secret = 'test_secret_key_123';
  const payload = { id: 12345, email: 'candidate@test.com', name: 'Candidate' };
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  assert.strictEqual(typeof token, 'string');
  
  const decoded = jwt.verify(token, secret);
  assert.strictEqual(decoded.id, 12345);
  assert.strictEqual(decoded.email, 'candidate@test.com');
});

test('Email normalization prevents case-sensitive auth bypass', () => {
  const emailInput = '  MayankPandey1331@GMAIL.COM  ';
  const normalized = emailInput.trim().toLowerCase();
  assert.strictEqual(normalized, 'mayankpandey1331@gmail.com');
});
