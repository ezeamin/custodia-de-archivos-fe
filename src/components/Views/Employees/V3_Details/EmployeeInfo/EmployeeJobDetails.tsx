import EmployeeDataField from './EmployeeDataField';
import dayjs from 'dayjs';

import EmployeeStatus from '@/components/Views/Employees/V1_List/Results/EmployeeStatus';

import { EmployeeInfoProps } from '@/components/interface/views';

const EmployeeJobDetails = (props: EmployeeInfoProps) => {
  const { data } = props;

  const formattedRegistrationDate = dayjs(data.registrationDate).format(
    'DD/MM/YYYY'
  );
  const formattedDepartureDate = data.departureDate
    ? dayjs(data.departureDate).format('DD/MM/YYYY')
    : 'N/A';

  return (
    <article className="card content-card flex sm:!flex-row md:!flex-col gap-3 animate-in-right">
      <img
        alt={data.lastname}
        className="rounded-md object-cover sm:w-1/4 md:w-auto"
        src={data.imgSrc}
      />
      <div className="flex flex-col gap-3 sm:w-3/4 md:w-auto">
        <h2 className="text-xl font-bold text-center">{`${data.lastname}, ${data.firstname}`}</h2>
        <EmployeeDataField
          label="Estado"
          value={<EmployeeStatus noBadge status={data.status} />}
        />
        <EmployeeDataField label="Nro. Legajo" value={data.fileNumber} />
        <EmployeeDataField label="Area" value={data.area.description} />
        <EmployeeDataField label="Posición" value={data.position} />
        <EmployeeDataField
          label="Fecha de ingreso"
          value={formattedRegistrationDate}
        />
        <EmployeeDataField
          label="Fecha de egreso"
          value={formattedDepartureDate}
        />
      </div>
    </article>
  );
};
export default EmployeeJobDetails;
