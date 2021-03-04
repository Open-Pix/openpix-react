import { api } from './api';
import { chargeGet } from './chargeGet';
import { chargePost } from './chargePost';

export const openPixApi = (appID: string) => {
  const apiFetch = api(appID);

  return {
    chargeGet: chargeGet(apiFetch),
    chargePost: chargePost(apiFetch)
  }
}
