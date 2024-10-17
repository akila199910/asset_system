import crypto from "crypto";
import bcrypt from "bcrypt";

export const generatePassword = () => {
  const length = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
  return crypto.randomBytes(length).toString("base64").slice(0, length);
};

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
