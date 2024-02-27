import { Link } from 'react-router-dom';

import DriversLicense from '../../../V3_Details/EmployeeInfo/DriversLicense';
import EmployeeStatus from '../EmployeeStatus';

import { EmployeesResultsListItemProps } from '@/components/interface/views';

const ResultsListItem = (props: EmployeesResultsListItemProps) => {
  const { employee, index } = props;

  return (
    <article
      className="content-card animate-in-bottom"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="card-body p-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="card-title">
            {employee.lastname}, {employee.firstname}
          </h2>
          <EmployeeStatus status={employee.status} />
        </div>
        <div className="flex justify-between gap-3">
          <div>
            <p>
              Edad: <span className="font-bold">{employee.age} años</span>
            </p>
            <p>
              CUIL: <span className="font-bold">{employee.cuil}</span>
            </p>
            <p>
              Puesto: <span className="font-bold">{employee.position}</span>
            </p>
            <p>
              Área:{' '}
              <span className="font-bold">{employee.area.description}</span>
            </p>
          </div>
          <div>
            <img
              alt={`${employee.lastname}, ${employee.firstname}`}
              className="h-[70px] w-[70px] min-w-[70px] rounded-md object-cover sm:h-[100px] sm:w-[100px]"
              height={70}
              src={employee.imgSrc}
              width={70}
            />
          </div>
        </div>
        <div className="-mt-2 flex gap-2">
          Carnet de manejo:{' '}
          <DriversLicense short data={employee.driversLicenseDate} />
        </div>
        <div className="divider my-0" />
        <div className="card-actions">
          <Link
            className="btn btn-primary w-full text-white"
            to={`/employees/${employee.id}/personal`}
          >
            VER MÁS
          </Link>
        </div>
      </div>
    </article>
  );
};
export default ResultsListItem;
