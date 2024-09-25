// Convert string to ArrayBuffer
function stringToArrayBuffer(str: string) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// Convert ArrayBuffer to string
function arrayBufferToString(buffer: ArrayBuffer) {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

async function hashPassword(password: string) {
  try {
    // Convert password to ArrayBuffer
    const passwordBuffer = stringToArrayBuffer(password);

    // Generate a cryptographic key
    const key = await crypto.subtle.generateKey(
      {
        name: "PBKDF2",
        hash: { name: "SHA-256" },
        salt: crypto.getRandomValues(new Uint8Array(16)), // Generate a random salt
        iterations: 10000, // Number of iterations
      },
      true,
      ["deriveKey", "deriveBits"]
    );

    // Derive a key from the password
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: crypto.getRandomValues(new Uint8Array(16)), // Generate another random salt
        iterations: 10000, // Same number of iterations
        hash: "SHA-256",
      },
      key,
      { name: "AES-GCM", length: 256 }, // Desired key algorithm
      true,
      ["encrypt", "decrypt"]
    );

    // Export derived key as raw format
    const exportedKey = await crypto.subtle.exportKey("raw", derivedKey);

    // Hash the password using the derived key and SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);

    // Convert hash buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => ("00" + byte.toString(16)).slice(-2))
      .join("");

    return hashHex; // Return hashed password
  } catch (error) {
    console.error("Error hashing password:", error);
    return null;
  }
}

// Usage
const plaintextPassword = "user_password";
hashPassword(plaintextPassword)
  .then((hashedPassword) => {
    console.log("Hashed password:", hashedPassword);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
