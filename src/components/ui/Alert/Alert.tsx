'use client';

import { useState } from 'react';

import { usePortrait } from 'hooks';

import { cn, removeLineBreaks } from 'utilities';

import { DTI, DTI_LIST } from 'dti';

import Grid from '../Grid/Grid';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import {
  MdCheckCircleOutline,
  MdClose,
  MdInfoOutline,
  MdOutlineErrorOutline,
  MdOutlineHighlightOff,
} from 'react-icons/md';

import type { AlertPropsType } from './Alert.types';

/**
 * A custom Alert component.
 *
 * @param props - The props for the Alert component.
 * @param className - Additional class names to apply to the alert.
 * @param closable - Render the close icon
 * @param hideIcon - Hide the SVG icon
 * @param title - Alert's title
 * @param type - Alert typeto switch the color and icon
 * @returns JSX.Element A custom combo box element.
 */

const Alert = (props: AlertPropsType): JSX.Element => {
  const {
    children,
    className,
    closable = false,
    hideIcon = false,
    type = 'info',
  } = props;

  const [open, setOpen] = useState(true);
  const isPortrait = usePortrait('sm');

  // Functions
  const handleClose = (): void => {
    setOpen(false);
  };

  const textWidth = (): 10 | 11 | 12 => {
    if ((closable && !hideIcon) || (isPortrait && !hideIcon)) return 10;
    if (closable || !hideIcon) return 11;

    return 12;
  };

  return (
    <Grid
      className={cn(
        removeLineBreaks`
        ${type === 'error' ? 'bg-red-200 dark:bg-red-800' : ''}
        ${type === 'info' ? 'bg-sky-200 dark:bg-sky-800' : ''}
        ${type === 'success' ? 'bg-green-200 dark:bg-green-800' : ''}
        ${type === 'warning' ? 'bg-orange-200 dark:bg-yellow-800' : ''}
        ${!open ? 'hidden' : ''}
        px-2 md:pr-3 
        py-2
        rounded-xl`,
        className
      )}
      container
      data-testid={DTI(DTI_LIST.DIV('alert'))}
      gap={0}
    >
      {!hideIcon ? (
        <Grid className="md:mr-1" item justifyContent="center" sm={1} xs={2}>
          {type === 'error' ? (
            <Icon
              iconComponent={<MdOutlineHighlightOff />}
              size="1.5em"
              title="Error"
            />
          ) : null}
          {type === 'info' ? (
            <Icon iconComponent={<MdInfoOutline />} size="1.5em" title="Info" />
          ) : null}
          {type === 'success' ? (
            <Icon
              iconComponent={<MdCheckCircleOutline />}
              size="1.5em"
              title="Success"
            />
          ) : null}
          {type === 'warning' ? (
            <Icon
              iconComponent={<MdOutlineErrorOutline />}
              size="1.5em"
              title="Warning"
            />
          ) : null}
        </Grid>
      ) : null}
      <Grid item xs={textWidth()}>
        {children}
      </Grid>
      {closable ? (
        <Grid
          alignItems="start"
          className="m-0 py-0 hidden sm:flex"
          item
          justifyContent="end"
          xs={1}
        >
          <IconButton
            dti={DTI(DTI_LIST.BUTTON('close'))}
            iconComponent={<MdClose />}
            label="Cerrar"
            onClick={handleClose}
            unbordered
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Alert;
