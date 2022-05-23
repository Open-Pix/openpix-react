import { baseUrl } from './apiBase';
import { Api } from './api';

const url = '/api/openpix/v1/charge';

const getUrl = () => `${baseUrl}${url}`;

export type Charge = {
  comment: string;
  correlationID: string;
  createdAt: string;
  customer: Customer;
  status: string;
  updatedAt: string;
  value: number;
};

export type ChargePostResponse = {
  charge?: Charge;
  correlationID?: string;
  brCode?: string;
  error?: string;
};

export type Customer = {
  name: string;
  taxID: string;
  email: string;
  phone: string;
};
export type ChargePostPayload = {
  correlationID: string;
  value: number;
  comment?: string;
  customer?: Customer;
};
export const chargePost =
  (api: Api<ChargePostResponse>) =>
  async (payload: ChargePostPayload): Promise<ChargePostResponse> => {
    const data = await api(getUrl(), {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return data;
  };
