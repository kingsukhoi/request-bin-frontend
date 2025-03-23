import ky from 'ky';

/**
 * Creates and returns a ky instance configured with a base URL from environment variables
 * @returns A configured ky instance
 */
export function createApiClient() {
  const baseUrl: string = import.meta.env.SVELTE_APP_BASE_URL;

  console.log(baseUrl);

  return ky.create({
    prefixUrl: baseUrl || '',
  });
}

/**
 * Pre-configured API client using the default environment variable
 */
export const api = createApiClient();