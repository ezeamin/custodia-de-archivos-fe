import { Link } from 'react-router-dom';

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
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center">
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
              DNI: <span className="font-bold">{employee.dni}</span>
            </p>
            <p>
              Puesto: <span className="font-bold">{employee.position}</span>
            </p>
            <p>
              Area:{' '}
              <span className="font-bold">{employee.area.description}</span>
            </p>
          </div>
          <div>
            <img
              alt={`${employee.lastname}, ${employee.firstname}`}
              className="min-w-[70px] w-[70px] sm:w-[100px] object-cover rounded-md"
              height={70}
              src={employee.imgSrc}
              width={70}
            />
          </div>
        </div>
        <div className="divider my-0" />
        <div className="card-actions">
          <Link
            className="btn w-full btn-primary text-white"
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
