import { baseUrl } from './apiBase';
import { Api } from './api';

const url = (id: string) => `/api/openpix/v1/charge/${id}`;

const getUrl = (id: string) => `${baseUrl}${url(id)}`;

import { Charge } from './chargePost';

type ChargeGetResponse = {
  charge: Charge;
  error: string;
};
export const chargeGet =
  (api: Api<ChargeGetResponse>) =>
  async (id: string): Promise<ChargeGetResponse> => {
    const data = await api(getUrl(id), {
      method: 'GET',
    });

    return data;
  };
