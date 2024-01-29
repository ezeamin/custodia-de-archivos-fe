import { createPortal } from 'react-dom';

import FamilyButton from './FamilyButton';
import FamilyInfoModal from './FamilyInfoModal';

import { Alert, Grid } from '@/components/ui';

import { FamilyListProps } from '@/components/interface/views';

const FamilyList = (props: FamilyListProps) => {
  const { data } = props;

  if (data.length === 0) {
    return (
      <Alert className="mb-2">
        No hay información familiar registrada. Agregue un nuevo miembro desde
        &quot;Agregar&quot;, en el ícono + encima de este mensaje.
      </Alert>
    );
  }

  return (
    <>
      <Grid container gap={2}>
        {data.map((familyMember) => (
          <Grid item key={familyMember.id} lg={6} md={12} sm={6} xs={12}>
            <FamilyButton member={familyMember} />
          </Grid>
        ))}
      </Grid>
      {createPortal(<FamilyInfoModal />, document.body)}
    </>
  );
};
export default FamilyList;
