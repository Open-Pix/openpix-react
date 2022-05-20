import {
  ChargePostPayload,
  ChargePostResponse,
  Charge,
} from './openpixApi/chargePost';
import { openPixApi } from './openpixApi/openPixApi';
import { useRef, useState } from 'react';
import { DEFAULT_POLLING_INTERVAL, usePooling } from './usePooling';

type ChargeUpdateStatus = {
  charge?: Charge;
  error?: string;
};

export type UseOpenPixReturn = {
  chargeCreate: (payload: ChargePostPayload) => Promise<ChargePostResponse>;
  chargeUpdateStatus: (correlationID: string) => Promise<ChargeUpdateStatus>;
};
export type UseOpenPix = {
  appID: string;
  onPay: (charge: Charge) => void;
  pollingInterval?: number;
  chargeCreate: (payload: ChargePostPayload) => Promise<ChargePostResponse>;
};
export const useOpenPix = ({
  appID,
  onPay,
  pollingInterval = DEFAULT_POLLING_INTERVAL,
}: UseOpenPix): UseOpenPixReturn => {
  const api = useRef(openPixApi(appID));
  const [charge, setCharge] = useState<Charge | null>(null);

  const chargeCreate = async (payload: ChargePostPayload) => {
    try {
      const { charge, error } = await api.current.chargePost(payload);

      if (error) {
        return { error };
      }

      setCharge(charge);

      return { charge };
    } catch (err) {
      return { error: err.toString() };
    }
  };

  const chargeUpdateStatus = async (correlationID: string) => {
    const { charge, error } = await api.current.chargeGet(correlationID);

    if (error) {
      return { error };
    }

    return { charge };
  };

  const fetchChargeStatus = async () => {
    if (!charge) {
      return;
    }

    const result = await api.current.chargeGet(charge.correlationID);

    if (result.error) {
      return;
    }

    if (result.charge) {
      setCharge(result.charge);

      if (result.charge.status === 'COMPLETED') {
        onPay(result.charge);
      }
    }
  };

  const isChargePaid = charge && charge.status === 'COMPLETED';
  const shouldPool = !!appID && !!charge && !isChargePaid;

  usePooling(shouldPool, fetchChargeStatus, pollingInterval);

  return {
    chargeCreate,
    chargeUpdateStatus,
  };
};
