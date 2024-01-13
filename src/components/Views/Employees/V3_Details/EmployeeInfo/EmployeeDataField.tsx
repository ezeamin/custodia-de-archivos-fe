import { EmployeeDataFieldProps } from '@/components/interface/views';

const EmployeeDataField = (props: EmployeeDataFieldProps) => {
  const { label, value } = props;

  if (value !== 0 && !value) {
    return <div className="custom-skeleton h-[52px] rounded-md" />;
  }

  if (typeof value !== 'string' && typeof value !== 'number') {
    return (
      <fieldset className="rounded-md bg-gray-100 p-3 pb-2 pt-1 dark:bg-slate-700">
        <span className="text-xs leading-[0.75rem] text-gray-600 dark:text-gray-400">
          {label}
        </span>
        <div className="font-bold leading-[1rem] text-gray-600 dark:text-gray-300">
          {value}
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="rounded-md bg-gray-100 p-3 pb-2 pt-1 dark:bg-slate-700">
      <span className="text-xs leading-[0.75rem] text-gray-600 dark:text-gray-400">
        {label}
      </span>
      <p className="font-bold leading-[1rem] text-gray-600 dark:text-gray-300">
        {value}
      </p>
    </fieldset>
  );
};
export default EmployeeDataField;
