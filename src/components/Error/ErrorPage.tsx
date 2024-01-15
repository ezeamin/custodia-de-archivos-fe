import { AiOutlineReload } from 'react-icons/ai';

import { Icon } from '../ui';

const ErrorPage = (): JSX.Element => {
  return (
    <div>
      <div className="flex min-h-[95vh] flex-col items-center justify-center px-4">
        <img
          alt="Logo Custodia de Archivos"
          className="mb-4 rounded-md object-contain"
          height="100px"
          src="/img/logo.png"
          width="100px"
        />
        <h1 className="text-3xl font-bold">Ha ocurrido un error</h1>
        <div className="divider mx-auto w-3/4" />
        <p className="text-center">
          Lamentamos lo ocurrido. Este no es un error esperado, y agradeceríamos
          nos informe del mismo.
        </p>
        <p className="mt-3 flex flex-col items-center gap-2 text-center md:flex-row">
          Para continuar, por favor recargue la página con el boton superior
          izquierdo:
          <Icon iconComponent={<AiOutlineReload />} title="Recargar" />{' '}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
