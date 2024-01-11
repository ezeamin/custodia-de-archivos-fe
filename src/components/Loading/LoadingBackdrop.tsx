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
      className={`w-screen h-screen ${
        isLoading ? 'block' : 'hidden'
      } fixed top-0 left-0 bg-black bg-opacity-60 z-[15000] flex justify-center items-center`}
    >
      <div className="flex flex-col justify-center items-center md:ml-[272px]">
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
