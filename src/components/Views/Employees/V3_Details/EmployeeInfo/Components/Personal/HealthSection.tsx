import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import EmployeeDataField from '../../EmployeeDataField';

import { Grid, Icon } from '@/components/ui';

import { PersonalProps } from '@/components/interface/views';

const HealthSection = (props: PersonalProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  return (
    <article>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold">Información de salud</h2>
        <Link
          className="tooltip tooltip-left"
          data-tip="Editar"
          to={`/employees/${employeeId}/health`}
        >
          <Icon iconComponent={<FaPencil size="1em" />} title="Editar" />
        </Link>
      </div>
      <Grid container component="section" gap={2}>
        <Grid item lg={6} xs={12}>
          <EmployeeDataField label="Apellido(s)" value={data?.lastname} />
        </Grid>
      </Grid>
    </article>
  );
};
export default HealthSection;
