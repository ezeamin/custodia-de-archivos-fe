import { Link } from 'react-router-dom';

import DriversLicense from '../../../V3_Details/EmployeeInfo/DriversLicense';
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
          className="h-[80px] w-[80px] min-w-[80px] rounded-md object-cover"
          height={80}
          src={employee.imgSrc}
          width={80}
        />
      </td>
      <td>
        <p className="font-bold xl:font-normal">{`${employee.lastname}, ${employee.firstname}`}</p>
        <p className="text-xs xl:hidden">Edad: {employee.age} años</p>
        <p className="text-xs xl:hidden">
          Antiguedad: {employee.antiquity} años
        </p>
      </td>
      <td className="hidden text-center xl:table-cell">{employee.age}</td>
      <td className="hidden text-center xl:table-cell">{employee.antiquity}</td>
      <td>
        <p>{employee.position}</p>
        <p className="text-xs xl:hidden">{employee.area.description}</p>
      </td>
      <td className="hidden xl:table-cell">{employee.area.description}</td>
      <td>
        <DriversLicense short data={employee.driversLicenseDate} />
      </td>
      <td className="text-end">
        <Link
          className="btn btn-primary text-white"
          to={`/employees/${employee.id}/personal`}
        >
          VER MÁS
        </Link>
      </td>
    </tr>
  );
};
export default ResultsTableRow;
