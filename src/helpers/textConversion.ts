/**
 * Checks if a base64 string contains valid UTF-8 encoded content
 * @param base64String The base64 string to check
 * @returns True if the content is valid UTF-8, false otherwise
 */
export function convertBase64toUtf8(base64String: string): string {
  try {
    // Try to decode the base64 string
    const binaryString = atob(base64String);

    // Convert binary string to array of bytes
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Try to decode bytes as UTF-8
    const decoder = new TextDecoder('utf-8', { fatal: true });
    return decoder.decode(bytes);

    // If we got here, it's valid UTF-8
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Either invalid base64 or not UTF-8 encoded
    return "";
  }
}