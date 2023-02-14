export const fetcher = (url: string) => fetch(url).then(res => res.json());

export const ONEDRIVE_DRIVE_API = 'https://graph.microsoft.com/v1.0/me/drive/';

export class HTTPError extends Error {
  info: unknown;
  status: number;
  constructor(message: string, info: unknown, status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

export const fetcherWithAuthorization = async <T>([key, token]: [string, string], options?: RequestInit): Promise<T> => {
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
  return data;
};
