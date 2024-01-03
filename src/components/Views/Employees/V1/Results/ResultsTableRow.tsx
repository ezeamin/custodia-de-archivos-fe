import { Link } from 'react-router-dom';

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
        <p className="lg:hidden text-xs">{employee.area}</p>
      </td>
      <td className="hidden lg:table-cell">{employee.area}</td>
      <td className="text-end">
        <Link
          className="btn btn-primary text-white"
          to={`/employees/${employee.id}`}
        >
          Ver más
        </Link>
      </td>
    </tr>
  );
};
export default ResultsTableRow;
