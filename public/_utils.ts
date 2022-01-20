export type Reviver = Parameters<typeof JSON.parse>[1];

export const jsonFetch = async <T>(
  url: RequestInfo | URL,
  init?: RequestInit,
  options?: { parseJson: Reviver },
): Promise<T> => {
  const res = await fetch(url.toString(), init);

  if (!res.ok) {
    throw Error(res.statusText);
  }

  const text = await res.text();
  const parsed = JSON.parse(text, options?.parseJson);

  if ("status" in parsed && parsed.status !== 0) {
    throw Error(parsed);
  }

  return parsed;
};
