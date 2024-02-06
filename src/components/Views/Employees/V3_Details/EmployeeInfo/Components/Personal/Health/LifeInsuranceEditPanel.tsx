import { Grid } from '@/components/ui';

import { LifeInsuranceEditPanelProps } from '@/components/interface/views';

const LifeInsuranceEditPanel = (props: LifeInsuranceEditPanelProps) => {
  const { data } = props;

  console.log(data);

  return (
    <Grid container component="section" gap={2}>
      <Grid item lg={6} xs={12}>
        {/* <EmployeeDataField label="Nombre del Seguro" value={data?.name} /> */}
      </Grid>
      <Grid item lg={6} xs={12}>
        {/* <EmployeeDataField label="Póliza Nro." value={data?.policyNumber} /> */}
      </Grid>
    </Grid>
  );
};
export default LifeInsuranceEditPanel;
