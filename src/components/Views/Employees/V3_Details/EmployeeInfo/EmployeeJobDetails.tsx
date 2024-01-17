import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import EmployeeDataField from './EmployeeDataField';
import dayjs from 'dayjs';

import { Icon } from '@/components/ui';
import EmployeeStatus from '@/components/Views/Employees/V1_List/Results/EmployeeStatus';

import { EmployeeInfoProps } from '@/components/interface/views';

const EmployeeJobDetails = (props: EmployeeInfoProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  const formattedStartDate = dayjs(data.startDate).format('DD/MM/YYYY');
  const formattedEndDate = data.endDate
    ? dayjs(data.endDate).format('DD/MM/YYYY')
    : 'N/A';

  return (
    <article className="content-card animate-in-right card !sticky top-5 flex gap-3 sm:!flex-row lg:!flex-col">
      <img
        alt={data.lastname}
        className="rounded-md object-cover sm:w-1/2 lg:w-auto"
        src={data.imgSrc}
      />
      <div className="flex flex-col gap-3 sm:w-1/2 lg:w-auto">
        <h2 className="text-center text-xl font-bold">{`${data.lastname}, ${data.firstname}`}</h2>
        <EmployeeDataField
          label="Estado"
          value={<EmployeeStatus noBadge status={data.status} />}
        />
        <EmployeeDataField label="Nro. Legajo" value={data.fileNumber} />
        <EmployeeDataField label="Area" value={data.area.description} />
        <EmployeeDataField label="Puesto" value={data.position} />
        <EmployeeDataField
          label="Fecha de ingreso"
          value={formattedStartDate}
        />
        <EmployeeDataField label="Fecha de egreso" value={formattedEndDate} />
        <Link className="btn btn-sm" to={`/employees/${employeeId}/edit/job`}>
          <Icon iconComponent={<FaPencil size="0.75em" />} title="Editar" />
          Modificar
        </Link>
      </div>
    </article>
  );
};
export default EmployeeJobDetails;
