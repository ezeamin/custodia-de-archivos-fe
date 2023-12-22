import { useRef } from 'react';

const SkipNavButton = (): JSX.Element => {
  const element = useRef<HTMLAnchorElement>(null);

  const handleFocus = (): void => {
    if (element.current) element.current.style.opacity = '1';
  };

  const handleBlur = (): void => {
    if (element.current) element.current.style.opacity = '0';
  };

  return (
    <a
      aria-label="Saltar navegación"
      href="#main"
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={element}
      style={{
        opacity: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        border: '1px solid #ccc',
        backgroundColor: '#333333',
        color: '#ccc',
        zIndex: '99999',
        padding: '0.5rem 1rem',
        pointerEvents: 'none',
      }}
      tabIndex={0}
    >
      Saltar navegación
    </a>
  );
};

export default SkipNavButton;
