import { useEffect, useState } from 'react';

import { Spinner } from '@/components/ui';

import type { LoadingBackdropProps } from '@/components/interface';

const LoadingBackdrop = (props: LoadingBackdropProps): JSX.Element => {
  const { open } = props;

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    if (!open) {
      setShowMessage(false);
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
      setShowMessage(false);
    };
  }, [open]);

  return (
    <div
      className={`w-screen h-screen ${
        open ? 'block' : 'hidden'
      } fixed top-0 left-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"}`}
    >
      <div className="flex flex-col justify-center items-center">
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
