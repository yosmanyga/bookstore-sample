import axios from "./axios";

import {UserPasswordType, UserUsernameType} from "../type";

const processLogin = async (
  username: UserUsernameType,
  password: UserPasswordType
) => {
  const response = await axios.post('/auth/login', {
    username: username,
    password: password
  });

  return response.data;
}

const processRegistration = async (
  username: UserUsernameType,
  password: UserPasswordType,
  repeat: UserPasswordType
) => {
  if (password !== repeat) {
    throw new Error('Passwords do not match');
  }

  const response = await axios.post('/auth/registration', {
    username: username,
    password: password
  });

  return response.data;
}

export {
  processLogin,
  processRegistration
}
