import * as crypto from "crypto";
import { PathLike, createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

const decipher = (
  password: string,
  salt: string,
  size: 128 | 192 | 256,
  input: PathLike,
  output: PathLike
) => {
  const inputStream = createReadStream(input);
  const outputStream = createWriteStream(output);
  
  // Leer los primeros 16 bytes como IV
  inputStream.once('readable', () => {
    const iv = inputStream.read(16);
    if (!iv) {
      throw new Error('No se pudo leer el IV del archivo cifrado');
    }
    
    const decipher = crypto.createDecipheriv(
      `aes-${size}-cbc`,
      new Uint8Array(crypto.scryptSync(password, salt, size / 8)),
      new Uint8Array(iv)
    );

    pipeline(
      inputStream,
      decipher,
      outputStream,
      (err) => {
        if (err) throw err;
      }
    );
  });
};

export default decipher;
