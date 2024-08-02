type UserIdType = number;
type UserUsernameType = string;
type UserPasswordType = string;

type UserDataType = {
  username: UserUsernameType,
  password: UserPasswordType
}

type UserType = {
  id: UserIdType
} & UserDataType;

export type {
  UserIdType,
  UserUsernameType,
  UserPasswordType,
  UserDataType,
  UserType
}
