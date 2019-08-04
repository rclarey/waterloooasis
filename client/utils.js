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

// this is so that react won't spit out an error message thinking we're trying
// to pass a second arg to the function returned by useState when using bind
// e.g.
//   BAD: <button onClick={setThing.bind(null, 1)} />
//   GOOD: <button onClick={maskSetState.bind(null, setThing, 1)} />
export function maskSetState(f, n) {
  f(n);
}
