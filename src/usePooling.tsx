import { useEffect, useRef } from 'react';

// 10 seconds
export const DEFAULT_POLLING_INTERVAL = 10000;

export const usePooling = (
  shouldPool: boolean,
  callback: (...args: any[]) => any,
  delay: number = DEFAULT_POLLING_INTERVAL,
): void => {
  const savedCallback = useRef<(...args: any[]) => any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id: NodeJS.Timeout | null = null;

    const handler = (...args: any[]) => {
      savedCallback.current && savedCallback.current(...args);
    };

    if (shouldPool) {
      id = setInterval(handler, delay);
    } else {
      if (id) {
        clearInterval(id);
      }
    }

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [shouldPool, delay]);
};
