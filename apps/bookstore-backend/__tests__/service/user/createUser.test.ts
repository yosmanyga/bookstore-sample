import bcrypt from 'bcrypt';
import {prismaMock} from '../../singleton'

import {createUser} from '../../../src/service/user'

jest.mock('bcrypt');

test('should create user ', async () => {
  const data = {
    username: 'user1',
    password: 'pass1',
    is_admin: false,
  };

  const user = {
    ...data,
    id: 1,
    salt: 'mockSalt',
    password: 'mockHash',
  };

  (bcrypt.genSalt as jest.Mock).mockResolvedValue('mockSalt');
  (bcrypt.hash as jest.Mock).mockResolvedValue('mockHash');

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(data)).resolves.toEqual(user);
})
