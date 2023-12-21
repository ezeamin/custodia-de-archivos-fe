import useOptions from '../../hooks/useOptions';

import modules from '../../data/modules';
import ProfileAvatar from '../ProfileAvatar';
import ThemeToggler from '../ThemeToggler';
import LogoutButton from './LogoutButton';
import MenuModuleButton from './MenuModuleButton';
import MenuOptionButton from './MenuOptionButton';
import { BiMenuAltRight } from 'react-icons/bi';
import { Drawer } from 'vaul';

const PortraitMenu = (): JSX.Element => {
  const options = useOptions();

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button color="btn-ghost" type="button">
          <BiMenuAltRight size="3em" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-zinc-700 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-white dark:bg-zinc-700 duration-300 rounded-t-[10px] flex-1 p-4 pb-0">
            <div className="mx-auto w-12 h-1 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
            <div className="max-w-md">
              <Drawer.Title className="flex gap-x-4 items-center mb-4 justify-between">
                {/* Avatar */}
                <ProfileAvatar />
                {/* Cambiar tema */}
                <ThemeToggler />
              </Drawer.Title>
            </div>
            <div className="mt-2 flex gap-4 justify-center max-w-md">
              {/* Botones de las Opciones */}
              {options.map((el) => (
                <MenuOptionButton key={el.id} option={el} />
              ))}
            </div>
            <div className="border-t border-zinc-200 py-4 flex gap-4 justify-center max-w-md mx-auto">
              {/* Boton para Cerrar Sesion */}
              <LogoutButton className="px-4 flex-1 mb-0" open />
            </div>
            <div className="bg-white border-t border-zinc-200 dark:bg-zinc-700 duration-400 mt-auto py-4">
              {/* Botones de los Modulos */}
              {modules.map((el) => (
                <MenuModuleButton el={el} key={el.id} open />
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default PortraitMenu;
