import bcryptjs from "bcryptjs";

export const hashPassword = (password) => {
  return bcryptjs.hash(password, 12);
};

export const compareHash = ({ hash, str }) => {
  return bcryptjs.compare(str, hash);
};
