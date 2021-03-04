export type Api = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export const api = (appID: string) => async (input: RequestInfo, init?: RequestInit): Api => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: appID,
    ...(init?.headers || {}),
  };

  const options = {
    ...init,
    headers,
  };

  try {
    const response = await fetch(input, options);

    const data = await response.json();

    console.log({
      input,
      data,
    });

    return data;
  } catch (error) {
    return {
      error,
    }
  }
}
