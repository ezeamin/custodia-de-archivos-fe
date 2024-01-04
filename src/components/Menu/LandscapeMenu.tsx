import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import ThemeTogglerButton from '../Common/ThemeTogglerButton';
import LogoCustodia from './LogoCustodia';
import LogoutButton from './LogoutButton';
import MenuModuleButton from './MenuModuleButton';

import { useSession } from '@/stores/useSession';

import { Button, Icon } from '@/components/ui';

import { routes } from '@/constants/routes/routes';

import { type LandscapeMenuProps } from '@/components/interface';

const LandscapeMenu = (props: LandscapeMenuProps): JSX.Element => {
  const { children } = props;

  const { user } = useSession();
  const navigate = useNavigate();

  const handleBackClick = (): void => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="bg-white dark:bg-blue-950 h-screen relative hidden md:block z-50 pl-4 pr-4 w-[17rem] animate-in-left landscape-menu">
        {/* PJT Logo */}
        <div className="mb-5 mt-3">
          <LogoCustodia />
          <h2 className="text-xl dark:text-white mt-3">
            Hola, <span className="font-bold">{user?.name}</span>
          </h2>
        </div>

        {/* Module Buttons */}
        <div className="flex flex-col items-center">
          {routes.map((el) => (
            <MenuModuleButton el={el} key={el.id} />
          ))}
        </div>

        {/* Logout Button */}
        <div className="absolute inset-x-4 bottom-0">
          <hr className="my-2 w-full" />
          <div className="flex gap-2 mb-5">
            <LogoutButton className="h-10 flex-1" />
            <ThemeTogglerButton />
            <Button
              unbordered
              className="w-12 h-12 p-0 theme-controller hover:bg-slate-300 dark:hover:bg-slate-700 tooltip tooltip-top flex justify-center"
              colorDark="dark:bg-slate-600"
              colorLight="bg-slate-200"
              data-tip="Volver"
              textColorDark="dark:text-white"
              onClick={handleBackClick}
            >
              <Icon
                iconComponent={<IoArrowBackOutline size="1.5em" />}
                title="Volver"
              />
            </Button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-auto relative" id="content">
        {children}
      </div>
    </div>
  );
};

export default LandscapeMenu;
