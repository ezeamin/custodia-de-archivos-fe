import { Link } from 'react-router-dom';

import icon from 'img/icon.png';

const LogoCustodia = (): JSX.Element => {
  return (
    <Link to="/">
      <img
        alt="Poder Judicial de Tucumán"
        className="bg-white border-none cursor-pointer mt-4 p-1 rounded-md"
        height={50}
        src={icon}
        width={50}
      />
    </Link>
  );
};

export default LogoCustodia;
