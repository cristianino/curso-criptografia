import * as crypto from "crypto";
import { PathLike, readFileSync } from "fs";

const hash = (
  algorithm: string,
  encoding: crypto.BinaryToTextEncoding,
  input: PathLike
) => {
  return crypto
    .createHash(algorithm)
    .update(readFileSync(input).toString())
    .digest(encoding);
};

export default hash;
