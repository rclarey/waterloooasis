import useFetch from 'fetch-suspense';

export function useApi(route, opts) {
  return useFetch(`/api${route}`, opts);
}

export async function post(route, body) {
  const res = await fetch(`/api${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) {
    throw json;
  }

  return json;
}
