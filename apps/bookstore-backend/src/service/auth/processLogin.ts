import {Prisma} from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../prisma/client";

import generateToken from "./generateToken";

const processLogin = async (
  username: Prisma.UserCreateInput['username'],
  password: Prisma.UserCreateInput['password'],
): Promise<string | false> => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  // No user found?
  if (!user) {
    return false;
  }

  const equal = await bcrypt.compare(password, user.password);

  // Invalid password?
  if (!equal) {
    return false;
  }

  /* At this point, we know that the user exists and the password is correct. */

  return generateToken(user);
};

export default processLogin;
