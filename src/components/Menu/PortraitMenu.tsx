import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { Alert, Button, Icon } from '../ui';
import LogoutButton from './LogoutButton';
import MenuModuleButton from './MenuModuleButton';
import { Drawer } from 'vaul';

import useGetUserAllowedRoutes from '@/hooks/useGetUserAllowedRoutes';
import { usePortraitMenu } from '@/stores/usePortraitMenu';
import { useSession } from '@/stores/useSession';

import ThemeTogglerButton from '@/components/Menu/ThemeTogglerButton';

import { userRoles } from '@/constants/userRoles/userRoles';

const PortraitMenu = (): JSX.Element => {
  const { user } = useSession();

  const navigate = useNavigate();
  const routes = useGetUserAllowedRoutes();
  const { opened, closeMenu } = usePortraitMenu();

  const handleBackClick = (): void => {
    navigate(-1);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 left-4 z-10 h-12 w-12 border-gray-300 dark:border-gray-500"
        colorDark="dark:bg-slate-600"
        colorLight="bg-slate-200"
        textColorDark="dark:text-white"
        onClick={handleBackClick}
      >
        <Icon iconComponent={<IoArrowBackOutline />} title="Volver" />
      </Button>
      <Drawer.Root shouldScaleBackground open={opened} onClose={closeMenu}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]"
            onClick={closeMenu}
          />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex flex-col rounded-t-[10px] bg-zinc-700">
            <div className="rounded-t-[10px] bg-white p-4 pb-1 dark:bg-zinc-700">
              <div className="mx-auto mb-4 h-1 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
              <section className="mb-4 text-center">
                <img
                  alt="Logo Custodia de Archivos"
                  className="mb-4 inline rounded-md"
                  height={64}
                  src="/img/logo.png"
                  width={150}
                />
                {/* Avatar */}
                <h2 className="text-xl dark:text-white">
                  Hola, <span className="font-bold">{user?.name}</span>
                </h2>
                {user?.role === userRoles.THIRD_PARTY && (
                  <Alert hideIcon className="mt-3 text-center" type="warning">
                    Usuario de solo lectura
                  </Alert>
                )}
              </section>
              <div className="duration-400 mx-auto -mb-5 mt-auto max-w-sm bg-white py-4 dark:bg-zinc-700">
                {/* Botones de los Modulos */}
                {routes.map((el) => (
                  <MenuModuleButton open el={el} key={el.id} />
                ))}
              </div>
              <div className="mx-auto flex max-w-sm justify-center gap-4 border-t border-zinc-200 py-4">
                {/* Boton para Cerrar Sesion */}
                <LogoutButton open className="mb-0 flex-1 px-4" />
                {/* Cambiar tema */}
                <ThemeTogglerButton />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default PortraitMenu;
