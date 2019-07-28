import useFetch from 'fetch-suspense';

// TODO: have this injected into the bundle via webpack during build
const API_URL = 'http://localhost:3000/api';

export function useApi(route, opts) {
  return useFetch(`${API_URL}${route}`, opts);
}

export async function post(route, body) {
  const res = await fetch(`${API_URL}${route}`, {
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
