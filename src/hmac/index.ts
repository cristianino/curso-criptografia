import * as crypto from "crypto";
import { PathLike, readFileSync } from "fs";

const hmac = (
  algorithm: string,
  key: string,
  encoding: crypto.BinaryToTextEncoding,
  input: PathLike
) => {
  return crypto
    .createHmac(algorithm, key)
    .update(readFileSync(input).toString())
    .digest(encoding);
};

export default hmac;
