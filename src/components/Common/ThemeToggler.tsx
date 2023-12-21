import ThemeProvider from '../providers/ThemeProvider';
import ThemeTogglerButton from './ThemeTogglerButton';

import { type AnyProp } from '../interface';

const ThemeToggler = (props: AnyProp): JSX.Element => {
  return (
    <ThemeProvider>
      <ThemeTogglerButton {...props} />
    </ThemeProvider>
  );
};
export default ThemeToggler;
