'use client';

import { DTI, DTI_LIST } from 'dti';

import Grid from '../Grid/Grid';
import IconButton from '../IconButton/IconButton';
import { MdClose } from 'react-icons/md';
import { Drawer as VaulDrawer } from 'vaul';

import type { DrawerPropsType } from './Drawer.types';

/**
 * A custom Drawer component.
 *
 * @param props - The component props.
 * @param className - Additional class names to apply to the icon container.
 * @param title - Drawer's title
 * @param triggerText - Text that will open the drawer
 * @returns JSX.Element The rendered Icon component.
 *
 * ```
 * @example
 *
 * - Standalone usage:
 * <Drawer title="some title" triggerText='some text'>Some content</Drawer>
 * ```
 */

const Drawer = (props: DrawerPropsType): JSX.Element => {
  const { children, className = '', title = '', triggerText } = props;

  return (
    <VaulDrawer.Root shouldScaleBackground>
      <VaulDrawer.Trigger asChild>
        <button type="button">{triggerText}</button>
      </VaulDrawer.Trigger>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="bg-black/40 fixed inset-0" />
        <VaulDrawer.Content className="bg-zinc-300 bottom-0 dark:bg-zinc-700 fixed flex flex-col left-0 max-h-[100%] mt-24 right-0 rounded-t-[10px] z-50">
          <div className="flex-1 mb-3 overflow-auto rounded-t-[10px]">
            <Grid
              className="border-2 border-transparent border-b-gray-200 mb-4"
              container
            >
              <Grid item sm={11} xs={10}>
                <VaulDrawer.Title className="text-xl">{title}</VaulDrawer.Title>
              </Grid>
              <Grid item justifyContent="end" sm={1} xs={2}>
                <VaulDrawer.Close>
                  <IconButton
                    colorDark="dark:bg-transparent"
                    colorLight="bg-transparent"
                    dti={DTI(DTI_LIST.BUTTON('close'))}
                    iconComponent={<MdClose />}
                  />
                </VaulDrawer.Close>
              </Grid>
            </Grid>
            <main className="mx-auto w-full">
              <Grid alignContent="center" container justifyContent="center">
                <Grid className="hidden md:block" item md={3} xs={12}>
                  &nbsp;
                </Grid>
                <Grid className={className} item md={6} xs={12}>
                  {children}
                </Grid>
                <Grid className="hidden md:block" item md={3} xs={12}>
                  &nbsp;
                </Grid>
              </Grid>
            </main>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};

export default Drawer;
