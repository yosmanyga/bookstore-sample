import jwt from "jsonwebtoken";
import {when} from "jest-when";

import {generateToken} from '../../../src/service/auth'

jest.mock('jsonwebtoken');

test('should generate token', async () => {
  process.env.AUTH_SECRET = 'mockSecretKey';

  const secretKey = process.env.AUTH_SECRET;

  // Mock user data
  const user = {
    id: 1,
    username: 'username-x',
    password: 'pass-x',
    salt: 'salt-x',
    is_admin: false,
  };

  const token = 'token-x';

  when((jwt.sign as jest.Mock))
    .calledWith({
      id: user.id,
      username: user.username,
      is_admin: user.is_admin
    }, secretKey)
    .mockReturnValue(token);

  const generated = generateToken(user);

  expect(generated).toBe(token);
});

test('should throw error when secret key not found', async () => {
  process.env.AUTH_SECRET = '';

  const user = {
    id: 1,
    username: 'username-x',
    password: 'pass-x',
    salt: 'salt-x',
    is_admin: false,
  };

  expect(() => generateToken(user)).toThrow('Secret key not found');
});
