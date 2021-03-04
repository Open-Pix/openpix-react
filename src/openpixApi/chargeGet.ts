import { baseUrl } from './apiBase';
import { Api } from './Api';

const url = (id: string) => `/api/openpix/v1/charge/${id}`;

const getUrl = (id: string) => `${baseUrl}${url(id)}`;

import { Charge } from './chargePost'

type ChargeGetResponse = {
  charge: Charge,
}
export const chargeGet = (api: Api) => async (id: string): Promise<ChargeGetResponse> => {
  const data = await api(getUrl(id), {
    method: 'GET',
  });

  return data;
}
