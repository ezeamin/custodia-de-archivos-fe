import { MdClose } from 'react-icons/md';

import { Drawer as VaulDrawer } from 'vaul';

import Grid from '@/components/ui/Grid/Grid';
import IconButton from '@/components/ui/IconButton/IconButton';

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
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex max-h-[100%] flex-col rounded-t-[10px] bg-zinc-300 dark:bg-zinc-700">
          <div className="mb-3 flex-1 overflow-auto rounded-t-[10px]">
            <Grid
              container
              className="mb-4 border-2 border-transparent border-b-gray-200"
            >
              <Grid item sm={11} xs={10}>
                <VaulDrawer.Title className="text-xl">{title}</VaulDrawer.Title>
              </Grid>
              <Grid item justifyContent="end" sm={1} xs={2}>
                <VaulDrawer.Close>
                  <IconButton
                    colorDark="dark:bg-transparent"
                    colorLight="bg-transparent"
                    iconComponent={<MdClose />}
                  />
                </VaulDrawer.Close>
              </Grid>
            </Grid>
            <main className="mx-auto w-full">
              <Grid container alignContent="center" justifyContent="center">
                <Grid item className="hidden md:block" md={3} xs={12}>
                  &nbsp;
                </Grid>
                <Grid item className={className} md={6} xs={12}>
                  {children}
                </Grid>
                <Grid item className="hidden md:block" md={3} xs={12}>
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
