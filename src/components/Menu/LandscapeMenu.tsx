import { useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';

import LogoCustodia from './LogoCustodia';
import LogoutButton from './LogoutButton';
import MenuModuleButton from './MenuModuleButton';
import { Button, Icon } from '@/components/ui';

import { routes } from '@/constants/routes';

import { type LandscapeMenuProps } from '@/components/interface';

const LandscapeMenu = (props: LandscapeMenuProps): JSX.Element => {
  const { children } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`bg-white dark:bg-primary duration-300 h-screen relative hidden md:block z-50 ${
          open ? 'flex-2 pl-4 pr-4 w-72' : 'flex-3 pl-2 pr-2 w-20'
        }`}
      >
        {/* Open/Close Menu Button */}
        <Button
          className={`absolute border-0 min-h-0 cursor-pointer duration-500 h-7 w-7 rounded top-9 -right-3 p-1 shadow ${
            !open ? 'rotate-180' : ''
          }`}
          colorDark="dark:bg-gray-700"
          colorLight="bg-sky-100"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Icon
            iconComponent={<BsChevronLeft />}
            title={open ? 'Cerrar Menú' : 'Abrir Menú'}
          />
        </Button>

        {/* PJT Logo */}
        <div className="flex items-center mb-8 mt-2">
          <LogoCustodia />
        </div>

        {/* Module Buttons */}
        {routes.map((el) => (
          <MenuModuleButton el={el} key={el.id} open={open} />
        ))}

        {/* Logout Button */}
        <div className="absolute inset-x-4 bottom-0">
          <hr className="my-2 w-full" />
          <LogoutButton className="h-10 w-full mb-5" open={open} />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 font-semibold overflow-auto relative" id="content">
        {children}
      </div>
    </div>
  );
};

export default LandscapeMenu;
