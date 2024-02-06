import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import EmployeeDataField from '../../EmployeeDataField';
import FitMessage from './Health/FitMessage';

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
          to={`/employees/${employeeId}/edit/health`}
        >
          <Icon iconComponent={<FaPencil size="1em" />} title="Editar" />
        </Link>
      </div>
      <h3>Obra Social</h3>
      <Grid container component="section" gap={2}>
        <Grid item lg={6} xs={12}>
          {/* <EmployeeDataField label="Nombre" value={data?.healthInsurance.name} /> */}
        </Grid>
        <Grid item lg={6} xs={12}>
          {/* <EmployeeDataField label="Número de Afiliado" value={data?.healthInsurance.affiliateNumber} /> */}
        </Grid>
      </Grid>
      {/* Preocupacionales */}
      <FitMessage data={data?.preoccupationalCheckup || null} />
      <EmployeeDataField
        label="Observaciones"
        value={data?.preoccupationalCheckup?.observations || 'N/A'}
      />
      {/* Beneficiarios de Seguro de Vida */}
    </article>
  );
};
export default HealthSection;
