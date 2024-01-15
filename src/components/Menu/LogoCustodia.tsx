import { Link } from 'react-router-dom';

import icon from '/img/icon.png';

const LogoCustodia = (): JSX.Element => {
  return (
    <Link to="/">
      <img
        alt="Custodia de Archivos Noroeste"
        className="mt-4 cursor-pointer rounded-md border-none bg-white p-1"
        height={50}
        src={icon}
        width={50}
      />
    </Link>
  );
};

export default LogoCustodia;
