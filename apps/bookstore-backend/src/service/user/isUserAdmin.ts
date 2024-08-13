import {User} from "@prisma/client";

import prisma from "../../prisma/client";
import {NotFoundError} from "../../error";

const isUserAdmin = async (
  id: User['id'],
): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new NotFoundError("User", id);
  }

  return user.is_admin;
}

export default isUserAdmin;
