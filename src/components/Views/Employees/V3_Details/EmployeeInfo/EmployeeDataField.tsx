import { EmployeeDataFieldProps } from '@/components/interface/views';

const EmployeeDataField = (props: EmployeeDataFieldProps) => {
  const { label, value } = props;

  if (value !== 0 && !value) {
    return (
      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md h-[52px]" />
    );
  }

  // React node
  if (typeof value !== 'string' && typeof value !== 'number') {
    <fieldset className="bg-gray-100 dark:bg-slate-700 rounded-md p-3 pb-2 pt-1">
      <span className="text-xs text-gray-600 dark:text-gray-400 leading-[0.75rem]">
        {label}
      </span>
      {value}
    </fieldset>;
  }

  return (
    <fieldset className="bg-gray-100 dark:bg-slate-700 rounded-md p-3 pb-2 pt-1">
      <span className="text-xs text-gray-600 dark:text-gray-400 leading-[0.75rem]">
        {label}
      </span>
      <p className="font-bold leading-[1rem] text-gray-600 dark:text-gray-300">
        {value}
      </p>
    </fieldset>
  );
};
export default EmployeeDataField;
