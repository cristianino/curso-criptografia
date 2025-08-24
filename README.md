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

### Diffie-Hellman Key Exchange
```bash
yarn run cli dh [options]
```

**Two modes of operation:**

**1. Generate new key pair (no arguments):**
```bash
# Generate new prime, generator, and key pair
yarn run cli dh

# Specify encoding for output
yarn run cli dh --enc base64
```

**2. Compute shared secret (with arguments):**
```bash
yarn run cli dh --pub <other_public_key> --priv <own_private_key> --prime <prime> --generator <generator> [encoding_options]
```

**Options:**
- `--pub`: Other party's public key
- `--priv`: Own private key
- `--prime, -p`: Prime number used in the exchange
- `--generator, -g`: Generator value
- `--pube`: Other's public key encoding (default: hex)
- `--prive`: Own private key encoding (default: hex)
- `--pe`: Prime encoding (default: hex)
- `--ge`: Generator encoding (default: hex)
- `--encoding, --enc`: Output encoding (default: hex)

**Examples:**
```bash
# Generate new Diffie-Hellman parameters and keys
yarn run cli dh

# Compute shared secret with known parameters
yarn run cli dh --generator 02 --priv caebb3958c5c3004ef3f60808c533f5bcd0f5bc09983e74aa5b9e5df --pub 3b76f787811d3122b4c924669f916dc79d4e5dd5e30cd214239d3d1a389d85298ceb2c1dee5c2c00ca992769a2e383afe2fd352395d8ef54712dae30a9ccb4d2ef216575db5b5cd1f5afc7fd3aa12972a8fa5a31e54a3e935264d8549683f27aedee09ff8920fda0a53760362aabd415ca35de1c65d63607c3c8ef237d3529498f7bfcf175dda9bcc28efb00e2a91233ad97d15b60127bf16f1fef23a0804e3e90cf65c6170ccdcd8322d91e59a46c88c1b0f6c706e62f2ab81eb39ede0a1487c20d059e78ce659d2d935c6299380e46f5dea75211ee8cbd3bea81be03843692d0ce225d723c93ed3555cec9b128370ad228a36f3cb1c1b557d7fb6c003cfb33 --prime ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff

# Using different encodings
yarn run cli dh --pub <key> --priv <key> --prime <prime> --generator <gen> --enc base64
```

### Generate asymmetric key pair
```bash
yarn run cli keypair --type <type> -p <passphrase> [options]
```

**Options:**
- `--type`: Key pair type (required, choices: rsa, rsa-pss)
- `--passphrase, -p`: Passphrase to encrypt private key (required)
- `--outDir, -o`: Output directory (default: ./.secrets)
- `--outFormat, -f`: Output format (default: pem, choices: pem, der)
- `--modulusLength, -m`: Modulus length (default: 2048, choices: 2048, 3072, 4096)

**Examples:**
```bash
# Generate RSA key pair (saves to .secrets/ by default)
yarn run cli keypair --type rsa -p mypassphrase

# Generate with custom directory and modulus length
yarn run cli keypair --type rsa -p mypassphrase -o ./keys -m 4096
```

### Sign a file
```bash
yarn run cli sign -i <input_file> --priv <private_key> [options]
```

**Options:**
- `--input, -i`: File to sign (required)
- `--privateKey, --priv`: Private key file to sign with (required)
- `--algorithm, -a`: Signature algorithm (default: RSA-SHA256)
- `--passphrase, -p`: Passphrase to decrypt private key
- `--encoding, --enc`: Output encoding (default: hex)

**Examples:**
```bash
# Sign a file with private key
yarn run cli sign -i yarn.lock --priv .secrets/private.pem -p mypassphrase

# Sign with different algorithm and encoding
yarn run cli sign -i package.json --priv .secrets/private.pem -a RSA-SHA512 --enc base64 -p mypassphrase
```

### Verify a signature
```bash
yarn run cli verify -i <input_file> --pub <public_key> -s <signature> [options]
```

**Options:**
- `--input, -i`: File to verify (required)
- `--publicKey, --pub`: Public key file to verify against (required)
- `--signature, -s`: Signature to verify (required)
- `--algorithm, -a`: Signature algorithm (default: RSA-SHA256)
- `--signatureEncoding, --se`: Signature encoding (default: hex)

**Examples:**
```bash
# Verify signature (using your actual command)
yarn run cli verify -i yarn.lock --pub .secrets/public.pem -s 477f73c6eb220d1853b85175f556fbcf9d74718ec1b3e2a82efd20d2b8813367e8ea31a715d884cfd79d9b598ad9479c8a197a6d2c196fbe4983fe0441f4995805a2a7a4731db517576b1e04097335166feaddbe67ea1fe9617e3f220e98950a230bfea5dfd7e7eb2dda7f979da2382ed77aae2aa9abb6efc1a9d0fa150186cfafa8458938bbe47fa7d7d6abb4ed7ab21efe239f2bbe8f109a5c1aaccbfbcc4596393be64068c2dbea78ee0c724b9f6c240be48e979dbb90e129578fd40c3f777b0e99c5fd47e1cf23836a470fdc8019a9f7828479245f6431292e38968ae1a9e02e351019a3eb48196d7b1a02b40d0808235a953b938728c2cf99eb59021b03

# Verify with different algorithm
yarn run cli verify -i document.txt --pub .secrets/public.pem -s <signature> -a RSA-SHA512
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
