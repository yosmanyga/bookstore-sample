import jwt from "jsonwebtoken";
import {User} from "@prisma/client";

const generateToken = (
  user: User
): string => {
  const secretKey = process.env.AUTH_SECRET;

  if (!secretKey) {
    throw new Error("Secret key not found");
  }

  return jwt.sign({
    id: user.id,
    username: user.username,
    is_admin: user.is_admin
  }, secretKey);
};

export default generateToken;
