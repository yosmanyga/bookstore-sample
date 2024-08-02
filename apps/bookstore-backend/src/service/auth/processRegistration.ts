import {Prisma} from "@prisma/client";

import createUser from "../user/createUser";
import generateToken from "./generateToken";

const processRegistration = async (
  data: Prisma.UserCreateInput,
): Promise<string> => {
  const user = await createUser(data);

  return generateToken(user);
};

export default processRegistration;
