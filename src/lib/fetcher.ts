export async function fetcherIsSWRMutationWithToken <T>([key, token]: string, { arg }: { arg: Record<string, string> }): Promise<T> {
  const headers = new Headers({
    Authorization: `Bearer ${token}`
  });

  const res = await fetch(
    key,
    { headers, method: 'PUT', body: JSON.stringify(arg) }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch API');
  }
  return data;
}

export async function fetcherWithToken <T>([key, token]: string): Promise<T> {
  const headers = new Headers({
    Authorization: `Bearer ${token}`
  });

  const res = await fetch(
    key,
    { headers, method: 'GET' }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error('verify failed');
  }

  return data;
}
