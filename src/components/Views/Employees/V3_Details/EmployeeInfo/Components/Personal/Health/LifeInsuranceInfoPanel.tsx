import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

import EmployeeDataField from '../../../EmployeeDataField';

import { Button, Grid } from '@/components/ui';

import { LifeInsuranceInfoPanelProps } from '@/components/interface/views';

const LifeInsuranceInfoPanel = (props: LifeInsuranceInfoPanelProps) => {
  const { data, onClickEdit, onClickDelete } = props;

  return (
    <Grid container component="section" gap={2}>
      <Grid item sm={4} xs={12}>
        <EmployeeDataField label="Nombre del Seguro" value={data?.name} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <EmployeeDataField label="Póliza Nro." value={data?.policyNumber} />
      </Grid>
      <Grid item sm={2} xs={12}>
        <Button
          className="h-full w-full flex-nowrap"
          startIcon={<FaPencil />}
          onClick={onClickEdit}
        >
          Editar
        </Button>
      </Grid>
      <Grid item sm={2} xs={12}>
        <Button
          outlineButton
          className="h-full w-full flex-nowrap"
          colorLight="btn-error"
          startIcon={<FaTrash />}
          onClick={onClickDelete}
        >
          Eliminar
        </Button>
      </Grid>
    </Grid>
  );
};
export default LifeInsuranceInfoPanel;
