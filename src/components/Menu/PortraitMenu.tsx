import { BiMenuAltRight } from 'react-icons/bi';

import { useSession } from '@/stores/useSession';
import { Drawer } from 'vaul';

import LogoutButton from './LogoutButton';
import MenuModuleButton from './MenuModuleButton';
import ThemeTogglerButton from '@/components/Common/ThemeTogglerButton';

import { routes } from '@/constants/routes';

const PortraitMenu = (): JSX.Element => {
  const { user } = useSession();

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button color="btn-ghost" type="button">
          <BiMenuAltRight size="3em" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[1px]" />
        <Drawer.Content className="bg-zinc-700 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-white dark:bg-zinc-700 duration-300 rounded-t-[10px] flex-1 p-4 pb-0">
            <div className="mx-auto w-12 h-1 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
            <section className="max-w-md mb-4 text-center">
              <img
                alt="Logo Custodia de Archivos"
                className="inline mb-4"
                src="/img/logo.png"
                width={150}
              />
              {/* Avatar */}
              <h2 className="text-xl">
                Hola, <span className="font-bold">{user?.name}</span>
              </h2>
            </section>
            <div className="bg-white border-t border-zinc-200 dark:bg-zinc-700 duration-400 mt-auto py-4 -mb-5">
              {/* Botones de los Modulos */}
              {routes.map((el) => (
                <MenuModuleButton open el={el} key={el.id} />
              ))}
            </div>
            <div className="border-t border-zinc-200 py-4 flex gap-4 justify-center max-w-md mx-auto">
              {/* Boton para Cerrar Sesion */}
              <LogoutButton open className="px-4 flex-1 mb-0" />
              {/* Cambiar tema */}
              <ThemeTogglerButton />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default PortraitMenu;
