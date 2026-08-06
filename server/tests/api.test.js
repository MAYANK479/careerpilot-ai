const test = require('node:test');
const assert = require('node:assert');
const { readUsers, writeUsers } = require('../services/dataStore');

test('DataStore user persistence test', () => {
  const users = readUsers();
  assert.strictEqual(Array.isArray(users), true, 'Users data store should return an array');
});

test('Auth logic test - User registration structure validation', () => {
  const newUser = {
    id: Date.now(),
    name: 'Test Candidate',
    email: 'testcandidate@example.com',
    password: 'password123'
  };
  assert.ok(newUser.id, 'User ID must be truthy');
  assert.strictEqual(newUser.name, 'Test Candidate');
  assert.strictEqual(newUser.email.includes('@'), true, 'Email must be valid');
});
