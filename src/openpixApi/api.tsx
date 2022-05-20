export type Api<Data extends any> = (input: RequestInfo, init?: RequestInit) => Promise<Data>;

export const api =
  (appID: string) =>
  async (input: RequestInfo, init?: RequestInit): Promise<any> => {
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

      return data;
    } catch (error) {
      return {
        error,
      };
    }
  };
