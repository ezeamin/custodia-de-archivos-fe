import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import EmployeeDataField from '../../EmployeeDataField';
import dayjs from 'dayjs';

import { Grid, Icon } from '@/components/ui';

import { formatCuil } from '@/utilities/utils';

import { PersonalProps } from '@/components/interface/views';

const PersonalSection = (props: PersonalProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  const formattedCuil = formatCuil(data?.cuil || '');
  const formattedBirthdate = data?.birthdate
    ? dayjs(data.birthdate).format('DD/MM/YYYY')
    : '';
  const age = data?.birthdate ? dayjs().diff(data.birthdate, 'year') : null;

  return (
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
          <EmployeeDataField label="Apellido(s)" value={data?.lastname} />
        </Grid>
        <Grid item lg={6} xs={12}>
          <EmployeeDataField label="Nombre(s)" value={data?.firstname} />
        </Grid>
        <Grid item lg={6} xs={12}>
          <EmployeeDataField label="CUIL" value={formattedCuil} />
        </Grid>
        <Grid item lg={6} xs={12}>
          <EmployeeDataField
            label="Fecha de nacimiento"
            value={
              data?.birthdate ? `${formattedBirthdate} (${age} años)` : null
            }
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <EmployeeDataField label="Género" value={data?.gender.description} />
        </Grid>
        <Grid item lg={6} xs={12}>
          <EmployeeDataField
            label="Estado civil"
            value={data?.civilStatus?.description || 'N/A'}
          />
        </Grid>
      </Grid>
    </article>
  );
};
export default PersonalSection;
