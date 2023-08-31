export async function getApiKey(): Promise<string> {
  const key = process.env.OMDB_KEY;

  if (!key) {
    throw new Error('OMDB_KEY is not set');
  }

  return key;
}
