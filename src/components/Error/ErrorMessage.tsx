import { Alert } from '../ui';

import { ErrorMessageProps } from '../interface/error';

const ErrorMessage = (props: ErrorMessageProps) => {
  const { refetch } = props;

  return (
    <Alert className="animate-in-right a-delay-500 mt-3" type="error">
      <p>
        Ocurrió un error leyendo la información. Por favor, intente nuevamente
        en unos instantes o reintente utilizando el botón debajo de este
        mensaje.
      </p>
      <button className="btn mt-2" type="button" onClick={refetch}>
        Reintentar
      </button>
    </Alert>
  );
};
export default ErrorMessage;
