import {Prisma} from "@prisma/client";
import prisma from "../../prisma/client";
import bcrypt from "bcrypt";

import {KnownError} from "../../error";

const createUser = async (
  data: Omit<Prisma.UserCreateInput, 'salt'>
) => {
  const {password, is_admin, ...rest} = data;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    return await prisma.user.create({
      data: {
        ...rest,
        password: hash,
        salt: salt,
        is_admin: is_admin,
      },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError
      && e.code === "P2002"
    ) {
      throw new KnownError("Username already exists");
    }

    throw e;
  }
};

export default createUser;
