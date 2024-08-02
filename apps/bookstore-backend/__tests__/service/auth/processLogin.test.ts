import bcrypt from "bcrypt";
import {when} from "jest-when";
import {prismaMock} from '../../singleton'

import {processLogin, generateToken} from '../../../src/service/auth'

jest.mock('bcrypt');
jest.mock('../../../src/service/auth/generateToken');

test('should process login', async () => {
  const username = 'username-x';
  const password = 'pass-x';

  const user = {
    id: 1,
    username: 'username-x',
    password: 'pass-x',
    salt: 'salt-x',
    is_admin: false,
  }

  prismaMock.user.findUnique.mockResolvedValue(user);

  when((bcrypt.compare as jest.Mock))
    .calledWith(password, user.password)
    .mockReturnValue(true);

  when((generateToken as jest.Mock))
    .calledWith(user)
    .mockReturnValue('token-x');

  await expect(processLogin(username, password)).resolves.toEqual('token-x');
});

test('should return false if user not found', async () => {
  const username = 'username-x';
  const password = 'pass-x';

  prismaMock.user.findUnique.mockResolvedValue(null);

  await expect(processLogin(username, password)).resolves.toBeFalsy();
});
