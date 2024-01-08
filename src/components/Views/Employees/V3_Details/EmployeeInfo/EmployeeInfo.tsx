import EmployeeStatus from '../../V1_List/Results/EmployeeStatus';
import EmployeeDetailsElement from './EmployeeDetailElement';
import dayjs from 'dayjs';

import { EmployeeInfoProps } from '@/components/interface/views';

const EmployeeInfo = (props: EmployeeInfoProps) => {
  const { data } = props;

  const formattedDni = data.dni.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  const formattedBirthdate = dayjs(data.birthdate).format('DD/MM/YYYY');
  const formattedRegistrationDate = dayjs(data.registrationDate).format(
    'DD/MM/YYYY'
  );
  const formattedDepartureDate = data.departureDate
    ? dayjs(data.departureDate).format('DD/MM/YYYY')
    : 'N/A';
  const formattedPhone = data.phone.replace(
    /(\+\d{2})(\d{4})(\d{4})/,
    '($1) $2-$3'
  );
  const formattedAddress = `${data.address.street} ${data.address.number}, ${data.address.city}, ${data.address.state}`;

  return (
    <section className="flex flex-col-reverse items-center sm:items-start sm:flex-row w-full gap-3">
      <div className="w-full sm:w-3/4">
        <EmployeeDetailsElement
          className="md:hidden"
          name="Estado"
          value={<EmployeeStatus status={data.status} />}
        />
        <EmployeeDetailsElement name="DNI" value={formattedDni} />
        <EmployeeDetailsElement
          name="Fecha de nacimiento"
          value={formattedBirthdate}
        />
        <EmployeeDetailsElement name="Género" value={formattedDni} />
        <EmployeeDetailsElement name="Email" value={data.email} />
        <EmployeeDetailsElement name="Teléfono" value={formattedPhone} />
        <EmployeeDetailsElement name="Domicilio" value={formattedAddress} />
        <div className="divider" />
        <EmployeeDetailsElement
          name="Fecha de ingreso"
          value={formattedRegistrationDate}
        />
        <EmployeeDetailsElement
          name="Fecha de egreso"
          value={formattedDepartureDate}
        />
        <EmployeeDetailsElement name="Area" value={data.area.description} />
        <EmployeeDetailsElement name="Posición" value={data.position} />
      </div>
      <div className="w-full sm:w-1/4">
        <img alt={data.lastname} className="rounded-md " src={data.imgSrc} />
      </div>
    </section>
  );
};
export default EmployeeInfo;
