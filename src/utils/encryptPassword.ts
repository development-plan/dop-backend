import { pbkdf2Sync } from 'crypto';

const encryptPassword = (password: string, salt: string) => {
  const encrypted = pbkdf2Sync(
    password,
    salt,
    200000,
    64,
    'sha512',
  ).toString('base64');
  return encrypted;
};

export default encryptPassword;
