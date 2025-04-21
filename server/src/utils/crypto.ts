export async function calculateHashedPassword(
  password: string,
  salt: string
): Promise<string> {
  const hashedPassword = await crypto.subtle.digest(
    "SHA-256",
    Buffer.from(password + salt)
  );
  return Buffer.from(hashedPassword).toString("hex");
}

export function generateSalt(): string {
  return crypto
    .getRandomValues(Buffer.from(new Uint8Array(16)))
    .toString("hex");
}

export async function generateSlug(): Promise<string> {
  const randomBytes = crypto.getRandomValues(new Uint8Array(4));
  const slug = Buffer.from(randomBytes).toString("hex");
  return slug;
}
