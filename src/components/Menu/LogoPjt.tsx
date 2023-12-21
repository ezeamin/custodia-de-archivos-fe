import Image from 'next/image';
import Link from 'next/link';

import { DTI, DTI_LIST } from 'dti';

import { Logo } from 'images';

const LogoPjt = (): JSX.Element => {
  return (
    <Link data-testid={DTI(DTI_LIST.MENU.LINK(0))} href="/">
      <Image
        alt="Poder Judicial de Tucumán"
        className="bg-white border-none cursor-pointer mt-4 p-1 rounded-md"
        data-testid={DTI(DTI_LIST.MENU.LOGO)}
        height={50}
        // ! DO NOT delete, it WILL throw an ESLint error on linting
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- logo is not a component
        src={typeof Logo === 'object' && 'src' in Logo ? Logo.src : ''}
        width={50}
      />
    </Link>
  );
};

export default LogoPjt;
