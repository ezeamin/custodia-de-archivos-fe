import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import { mockedEmployee } from '../../mocked';
import EmployeeDataField from '../EmployeeDataField';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { getEmployeeFn } from '@/api/api-calls/employees';

import { Grid, Icon } from '@/components/ui';

const data = mockedEmployee;

const EmployeePersonalTab = () => {
  const { id: employeeId } = useParams();

  const {
    /* data */
    error,
  } = useQuery({
    queryKey: [`employee_${employeeId}`],
    queryFn: () => getEmployeeFn(employeeId!),
  });

  console.log(error); // TODO: Remove this line and the error variable

  const formattedDni = data?.data?.dni.replace(
    /(\d{2})(\d{3})(\d{3})/,
    '$1.$2.$3'
  );
  const formattedBirthdate = data?.data?.birthdate
    ? dayjs(data.data.birthdate).format('DD/MM/YYYY')
    : '';
  const formattedAddress = data?.data?.address
    ? `${data?.data?.address.street} ${data?.data?.address.number}, ${data?.data?.address.city}, ${data?.data?.address.state}`
    : '';

  return (
    <>
      <article>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Información personal</h2>
          <Link
            className="tooltip tooltip-left"
            data-tip="Editar"
            to={`/employees/${employeeId}/edit/personal`}
          >
            <Icon iconComponent={<FaPencil size="1em" />} title="Editar" />
          </Link>
        </div>
        <Grid container component="section" gap={2}>
          <Grid item lg={6} xs={12}>
            <EmployeeDataField
              label="Apellido(s)"
              value={data?.data?.lastname}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <EmployeeDataField
              label="Nombre(s)"
              value={data?.data?.firstname}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <EmployeeDataField label="D.N.I." value={formattedDni} />
          </Grid>
          <Grid item lg={6} xs={12}>
            <EmployeeDataField
              label="Fecha de nacimiento"
              value={formattedBirthdate}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <EmployeeDataField
              label="Género"
              value={data?.data?.gender.description}
            />
          </Grid>
        </Grid>
      </article>
      <div className="divider" />
      <article>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Contacto</h2>
          <Link
            className="tooltip tooltip-left"
            data-tip="Editar"
            to={`/employees/${employeeId}/edit/contact`}
          >
            <Icon iconComponent={<FaPencil size="1em" />} title="Editar" />
          </Link>
        </div>
        <Grid container component="section" gap={2}>
          <Grid item xs={12}>
            <EmployeeDataField label="Email" value={data?.data?.email} />
          </Grid>
          <Grid item lg={6} xs={12}>
            <EmployeeDataField label="Teléfono" value={data?.data?.phone} />
          </Grid>
          <Grid item className="hidden md:block" lg={6} xs={12}>
            <EmployeeDataField
              label="Ciudad"
              value={data?.data?.address.city}
            />
          </Grid>
          <Grid item className="mb-1" xs={12}>
            <EmployeeDataField label="Dirección" value={formattedAddress} />
          </Grid>
        </Grid>
      </article>
    </>
  );
};
export default EmployeePersonalTab;
