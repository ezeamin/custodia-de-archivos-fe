import { Link } from 'react-router-dom';

import { paths } from '@/constants/routes/paths';

const Error404 = (): JSX.Element => {
  return (
    <div className="flex min-h-[95vh] flex-col items-center justify-center px-5">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <div className="divider mx-auto w-3/4" />
      <p className="w-3/4 text-center">
        Lamentamos lo ocurrido. Esta página parece no existir en nuestros
        sistemas. Por favor, navegue nuevamente a una página existente revisando
        la URL ingresada, o haciendo click aqui:
      </p>
      <Link className="btn mt-6" to={paths.HOME}>
        VOLVER A INICIO
      </Link>
    </div>
  );
};

export default Error404;
