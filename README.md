# OpenPix React SDK

OpenPix React SDK Using the [OpenPix](https://openpix.com.br/) Platform. [OpenPix Developers](https://developers.openpix.com.br/)

## How to install

```jsx
yarn install @openpix/react
```

## Usage with React

```jsx
import { useState } from 'react';
import { useOpenPix } from '@openpix/react';
import QRCode from 'qrcode.react';

const App = () => {
  const [charge, setCharge] = useState(null);
  
  const onPay = (charge) => {
    // TODO do something
    console.log('charge was paid');
  }

  const { chargeCreate } = useOpenPix({
    appID: process.env.APP_ID,
    onPay,
  });

  const newCharge = async () => {
    const payload = {
      correlationID: 'myCorrelationID',
      value: 1, // one cent
      comment: 'Donate',
    }

    const { charge, error } = await chargeCreate(payload);

    if (error) {
      setError(error);
      return;
    }

    setCharge(charge);
  }

  if (charge) {
    return (
      <QRCode
        size={200}
        renderAs={'svg'}
        value={brCode}
        includeMargin={false}
      />
    );
  }

  return (
    <>
      <button onClick={newCharge}>
        Create New Charge
      </button>
    </>
  )
}
```

## Usage with React Native or Expo

```jsx
import { useState } from 'react';
import { useOpenPix } from '@openpix/react';
import QRCode from 'react-native-qrcode-svg';

const App = () => {
  const [charge, setCharge] = useState(null);
  
  const onPay = (charge) => {
    // TODO do something
    console.log('charge was paid');
  }

  const { chargeCreate } = useOpenPix({
    appID: process.env.APP_ID,
    onPay,
  });

  const newCharge = async () => {
    const payload = {
      correlationID: 'myCorrelationID',
      value: 1, // one cent
      comment: 'Donate',
    }

    const { charge, error } = await chargeCreate(payload);

    if (error) {
      setError(error);
      return;
    }

    setCharge(charge);
  }

  if (charge) {
    return (
      <QRCode
        size={200}
        value={brCode}
      />
    );
  }

  return (
    <>
      <button onClick={newCharge}>
        Create New Charge
      </button>
    </>
  )
}
```
