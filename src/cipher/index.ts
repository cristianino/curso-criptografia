import * as crypto from "crypto";
import { PathLike, createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

const cipher = (
  password: string,
  salt: string,
  size: 128 | 192 | 256,
  input: PathLike,
  output: PathLike
) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    `aes-${size}-cbc`,
    new Uint8Array(crypto.scryptSync(password, salt, size / 8)),
    new Uint8Array(iv)
  );

  const outputStream = createWriteStream(output);
  
  // Escribir el IV al inicio del archivo
  outputStream.write(iv);

  pipeline(
    createReadStream(input),
    cipher,
    outputStream,
    (err) => {
      if (err) throw err;
    }
  );
};

export default cipher;
