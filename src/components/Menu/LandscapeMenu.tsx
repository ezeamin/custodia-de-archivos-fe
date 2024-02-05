import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import LogoCustodia from './LogoCustodia';
import LogoutButton from './LogoutButton';
import MenuModuleButton from './MenuModuleButton';
import ThemeTogglerButton from './ThemeTogglerButton';

import useGetUserAllowedRoutes from '@/hooks/useGetUserAllowedRoutes';
import { useSession } from '@/stores/useSession';

import { Alert, Button, Icon } from '@/components/ui';

import { userRoles } from '@/constants/userRoles/userRoles';

import { type LandscapeMenuProps } from '@/components/interface';

const LandscapeMenu = (props: LandscapeMenuProps): JSX.Element => {
  const { children } = props;

  const { user } = useSession();
  const routes = useGetUserAllowedRoutes();
  const navigate = useNavigate();

  const handleBackClick = (): void => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="animate-in-left landscape-menu relative z-50 hidden h-screen w-[17rem] bg-white pl-4 pr-4 dark:bg-blue-950 md:block">
        {/* PJT Logo */}
        <div className="mb-5 mt-3">
          <LogoCustodia />
          <h2 className="mt-3 text-xl dark:text-white">
            Hola, <span className="font-bold">{user?.name}</span>
          </h2>
          {user?.role === userRoles.THIRD_PARTY && (
            <Alert hideIcon className="mt-3 text-center" type="warning">
              Usuario de solo lectura
            </Alert>
          )}
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
          <div className="mb-5 flex gap-2">
            <LogoutButton className="h-10 flex-1" />
            <ThemeTogglerButton />
            <Button
              unbordered
              className="theme-controller tooltip tooltip-top flex h-12 w-12 justify-center p-0 hover:bg-slate-300 dark:hover:bg-slate-700"
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
      <div className="relative flex-1 overflow-auto" id="content">
        {children}
      </div>
    </div>
  );
};

export default LandscapeMenu;
