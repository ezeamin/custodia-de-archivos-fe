import { createPortal } from 'react-dom';

import LifeInsuranceButton from './LifeInsuranceButton';
import LifeInsuranceInfoModal from './Modal/LifeInsuranceInfoModal';

import { Alert, Grid } from '@/components/ui';

import { LifeInsurancesListProps } from '@/components/interface/views';

const LifeInsurancesList = (props: LifeInsurancesListProps) => {
  const { data } = props;

  if (data.length === 0) {
    return (
      <Alert className="mb-2">
        No hay seguros de vida registrados. Agregue uno nuevo desde
        &quot;Agregar&quot;, en el ícono + encima de este mensaje.
      </Alert>
    );
  }

  return (
    <>
      <Grid container gap={2}>
        {data.map((lifeInsurance) => (
          <Grid item key={lifeInsurance.id} lg={6} md={12} sm={6} xs={12}>
            <LifeInsuranceButton data={lifeInsurance} />
          </Grid>
        ))}
      </Grid>
      {createPortal(<LifeInsuranceInfoModal />, document.body)}
    </>
  );
};
export default LifeInsurancesList;
