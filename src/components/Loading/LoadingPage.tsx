'use client';

import { useEffect, useState } from 'react';

import { Spinner } from 'ui';

const LoadingPage = (): JSX.Element => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      setShowMessage(false);
    };
  }, []);

  return (
    <div className="loading-page w-full flex flex-col justify-center items-center">
      <Spinner useTheme />
      <p
        className="text-center text-dark"
        style={{
          transition: 'all 1s',
          marginTop: '-5rem',
          opacity: showMessage ? 1 : 0,
        }}
      >
        Cargando...
      </p>
    </div>
  );
};

export default LoadingPage;
