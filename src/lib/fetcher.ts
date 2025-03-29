export const ONEDRIVE_DRIVE_API = 'https://graph.microsoft.com/v1.0/me/drive/';

export class HTTPError extends Error {
  info: unknown;
  status: number;
  constructor(message: string, info: unknown, status: number) {
    super(message);
    this.name = 'HTTPError';
    this.info = info;
    this.status = status;
  }
}

export async function fetcherWithJSON<T>(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const data = await res.json();
    if ('msg' in data)
      throw new HTTPError(data.msg, data, res.status);

    throw new HTTPError('An error occurred while fetching the data.', data, res.status);
  }

  return res.json() as Promise<T>;
}

export async function fetcher<T>(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    const data = await res.json();
    throw new HTTPError(data.msg, data, res.status);
  }

  return res.json() as Promise<T>;
}

export async function fetcherWithAuthorization<T>([key, token]: [string, string], options?: RequestInit): Promise<T> {
  const headers = new Headers({
    Authorization: `Bearer ${token}`
  });

  if (options?.headers) {
    const incomingHeaders = new Headers(options.headers);
    incomingHeaders.forEach((value, key) => headers.append(key, value));
  }

  const res = await fetch(
    new URL(key, ONEDRIVE_DRIVE_API),
    { ...options, headers }
  );

  const data = res.headers.get('content-type')?.includes('application/json')
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    // Attach extra info to the error object.
    throw new HTTPError('An error occurred while fetching the data.', data, res.status);
  }
  return data as T;
}
