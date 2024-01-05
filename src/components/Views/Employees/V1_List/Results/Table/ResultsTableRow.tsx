import { Link } from 'react-router-dom';

import EmployeeStatus from '../EmployeeStatus';

import { EmployeesResultsTableRowProps } from '@/components/interface/views';

const ResultsTableRow = (props: EmployeesResultsTableRowProps) => {
  const { employee } = props;

  return (
    <tr>
      <td className="text-center">
        <EmployeeStatus status={employee.status} />
      </td>
      <td className="px-0">
        <img
          alt={`${employee.lastname}, ${employee.firstname}`}
          className="object-cover rounded-md min-w-[50px]"
          height={80}
          src={employee.imgSrc}
          width={80}
        />
      </td>
      <td>
        <p className="font-bold lg:font-normal">{`${employee.lastname}, ${employee.firstname}`}</p>
        <p className="lg:hidden text-xs">Edad: {employee.age} años</p>
        <p className="lg:hidden text-xs">
          Antiguedad: {employee.antiquity} años
        </p>
      </td>
      <td className="text-center hidden lg:table-cell">{employee.age}</td>
      <td className="text-center hidden lg:table-cell">{employee.antiquity}</td>
      <td>
        <p>{employee.position}</p>
        <p className="xl:hidden text-xs">{employee.area.description}</p>
      </td>
      <td className="hidden xl:table-cell">{employee.area.description}</td>
      <td className="text-end">
        <Link
          className="btn btn-primary text-white"
          to={`/employees/${employee.id}`}
        >
          VER MÁS
        </Link>
      </td>
    </tr>
  );
};
export default ResultsTableRow;
