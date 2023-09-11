import { useCallback, useState } from 'react';

type Status = {
  submitting: boolean;
  succeeded: boolean;
  error?: string;
  data?: object;
};

type OnFetchFinished = (data: object) => void;

export const useHttpFetch = () => {
  const [status, setStatus] = useState<Status>({ submitting: false, succeeded: false });

  const sendRequest = useCallback(async (url: string, config: RequestInit, onFetchFinished?: OnFetchFinished) => {
    setStatus({
      submitting: true,
      succeeded: false,
    });

    try {
      const response: Response = await fetch(url, config);
      const data = await response.json();

      if (response.ok) {
        setStatus({
          submitting: false,
          succeeded: true,
          data: data,
        });

        if(onFetchFinished) onFetchFinished(data);
      } else {
        throw new Error(data.error || data.message || 'Error submitting...');
      }
    } catch (error: any) {
      setStatus({
        submitting: false,
        succeeded: false,
        error: String(error),
      });
    }
  }, []);

  return { status, sendRequest };
};
