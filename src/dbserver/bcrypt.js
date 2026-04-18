import bcrypt from "bcryptjs";

export const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);

export const calcHash = (text) => bcrypt.hashSync(text, 12);
