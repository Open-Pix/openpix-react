import { useOpenPix } from '../useOpenPix';
import {Charge, ChargePostResponse} from '../openpixApi/chargePost';
import { useState } from 'react';

export const OpenPixApp = () => {
  const correlationID = 'correlationID';
  const [paid, setPaid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [charge, setCharge] = useState<ChargePostResponse | null>(null);

  // eslint-disable-next-line
  const onPay = (charge: Charge) => {
    setPaid(true);
  };

  const { chargeCreate } = useOpenPix({
    appID: 'appID',
    onPay,
    pollingInterval: 1,
  });

  const create = async () => {
    const payload = {
      correlationID,
      value: 1, // one cent
      comment: 'Donate',
    };

    const { charge, error } = await chargeCreate(payload);

    if (error) {
      setError(error);
      return;
    }

    setCharge(charge);
  };

  if (error) {
    return <span>{error}</span>;
  }

  if (paid) {
    return <span>Paid</span>;
  }

  if (charge) {
    return <span>{charge.brCode}</span>;
  }

  return (
    <>
      <span>OpenPix</span>
      <button onClick={create}>Create Charge</button>
    </>
  );
};
