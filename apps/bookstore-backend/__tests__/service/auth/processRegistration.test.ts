import {when} from "jest-when";

import {processRegistration, generateToken} from '../../../src/service/auth'
import createUser from "../../../src/service/user/createUser";

jest.mock('../../../src/service/user/createUser');
jest.mock('../../../src/service/auth/generateToken');

test('should process registration', async () => {
  const data = {
    username: 'username-x',
    password: 'pass-x',
    salt: 'salt-x',
    is_admin: false,
  }

  const user = {
    id: 1,
    ...data,
  }

  const token = 'token-x';

  when((createUser as jest.Mock))
    .calledWith(data)
    .mockReturnValue(user);

  when((generateToken as jest.Mock))
    .calledWith(user)
    .mockReturnValue(token);

  await expect(processRegistration(data)).resolves.toEqual(token);
});
