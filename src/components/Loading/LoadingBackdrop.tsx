import { useEffect, useState } from 'react';

import { useLoadingState } from '@/stores/useLoadingState';

import { Spinner } from '@/components/ui';

const LoadingBackdrop = (): JSX.Element => {
  const { isLoading } = useLoadingState();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    if (!isLoading) {
      setShowMessage(false);
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
      setShowMessage(false);
    };
  }, [isLoading]);

  return (
    <div
      className={`h-screen w-screen ${
        isLoading ? 'block' : 'hidden'
      } fixed left-0 top-0 z-[15000] flex items-center justify-center bg-black bg-opacity-60`}
    >
      <div className="flex flex-col items-center justify-center md:ml-[272px]">
        <Spinner />
        <p
          className="text-center text-white"
          style={{
            transition: 'all 1s',
            marginTop: '-5rem',
            opacity: showMessage ? 1 : 0,
          }}
        >
          Por favor espere...
        </p>
      </div>
    </div>
  );
};

export default LoadingBackdrop;
