import { getApiKey } from '@/api/getApiKey';
import { camelCase } from 'lodash-es';

export async function requestFromOmdb<T>(query: string): Promise<
  {
    response: 'True';
  } & T
> {
  const key = await getApiKey();

  const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&${query}`);

  const result = (await response.json()) as
    | ({
        Response: 'True';
      } & T)
    | {
        Response: 'False';
        Error: string;
      };

  if (result.Response === 'False') {
    throw new Error(result.Error);
  }

  return convertKeysToCamelCase<
    {
      response: 'True';
    } & T
  >(result);
}

function convertKeysToCamelCase<T>(item: unknown): T {
  if (Array.isArray(item)) {
    return item.map(convertKeysToCamelCase) as T;
  }

  if (typeof item === 'object' && item !== null) {
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => [camelCase(key), convertKeysToCamelCase(value)]),
    ) as T;
  }

  return item as T;
}
