import EmployeeStatus from './EmployeeStatus';

import { ResultsTableRowProps } from '@/components/interface/views';

const ResultsTableRow = (props: ResultsTableRowProps) => {
  const { employee } = props;

  return (
    <tr>
      <td className="text-center">
        <EmployeeStatus status={employee.status} />
      </td>
      <td className="px-0">
        <img
          alt={`${employee.lastname}, ${employee.firstname}`}
          className="object-cover rounded-md"
          height={80}
          src={employee.imgSrc}
          width={80}
        />
      </td>
      <td>{`${employee.lastname}, ${employee.firstname}`}</td>
      <td className="text-center">{employee.age}</td>
      <td className="text-center">{employee.antiquity}</td>
      <td>{employee.position}</td>
      <td>{employee.area}</td>
    </tr>
  );
};
export default ResultsTableRow;
