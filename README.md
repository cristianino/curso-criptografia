# Cryptography Practice Project

This project is designed to help you practice cryptography concepts using Node.js. It includes implementations for encryption, decryption, hashing, HMAC, key pair generation, PRNG, scrypt, signing, verification, and Diffie-Hellman key exchange.

## Project Structure

```
secrets/
  private.pem
  public.pem
src/
  cipher/
  decipher/
  diffie-hellman/
  hash/
  hmac/
  keypair/
  prng/
  scrypt/
  sign/
  verify/
  index.ts
index.ts
package.json
tsconfig.json
yarn.lock.enc
yarn.lock.dec
```

## Getting Started

Install dependencies:
```bash
yarn install
```

## CLI Commands

### Generate random numbers/data (PRNG)
```bash
yarn run cli prng --type <type> [options]
```

**Types:**
- `bytes`: Generate random bytes
- `int`: Generate random integer
- `uuid`: Generate UUID

**Options:**
- `--size, -s`: Size for random bytes (default: 16)
- `--min`: Minimum value for integer (default: 0)  
- `--max`: Maximum value for integer (default: 100)
- `--encoding, --enc`: Output encoding (default: hex)

**Examples:**
```bash
# Generate 32 random bytes in hex format
yarn run cli prng --type bytes -s 32

# Generate random integer between 1 and 100
yarn run cli prng --type int --min 1 --max 100

# Generate UUID
yarn run cli prng --type uuid

# Generate 16 random bytes in base64 format
yarn run cli prng --type bytes -s 16 --enc base64
```

### Encrypt a file
```bash
yarn run cli cipher -p <password> --salt <salt> -i <input_file> -o <output_file>
```

### Decrypt a file
```bash
yarn run cli decipher -p <password> --salt <salt> -i <input_file> -o <output_file>
```

#### Example:
```bash
yarn run cli decipher -p platzi --salt 123 -i yarn.lock.enc -o yarn.lock.dec
```

## Features
- AES encryption/decryption
- Hashing
- HMAC
- Key pair generation
- PRNG (Pseudo-Random Number Generator)
- Scrypt key derivation
- Digital signing and verification
- Diffie-Hellman key exchange

## Notes
- All cryptographic operations are implemented using Node.js's `crypto` module.
- Keys and salts must be managed securely.
- For educational purposes only.

## License
MIT
