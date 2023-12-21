import { DTI, DTI_LIST } from 'dti';

const AccountButton = (): JSX.Element => {
  return (
    <button
      className="bg-sky-100 dark:bg-neutral duration-500 text-center px-4 rounded shadow dark:text-white"
      data-testid={DTI(DTI_LIST.BUTTON('my-account'))}
      onClick={() => {}}
      type="button"
    >
      Mi Cuenta
    </button>
  );
};

export default AccountButton;
