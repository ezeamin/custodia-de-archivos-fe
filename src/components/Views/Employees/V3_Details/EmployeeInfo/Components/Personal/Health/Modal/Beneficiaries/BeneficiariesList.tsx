import BeneficiaryItem from './BeneficiaryItem';

import { Grid } from '@/components/ui';

import { BeneficiariesListProps } from '@/components/interface/views';

const BeneficiariesList = (props: BeneficiariesListProps) => {
  const { data, lifeInsuranceId } = props;

  return (
    <Grid container component="section" gap={2}>
      {data.map((beneficiary) => (
        <Grid item key={beneficiary.id} sm={6} xs={12}>
          <BeneficiaryItem
            beneficiary={beneficiary}
            lifeInsuranceId={lifeInsuranceId}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default BeneficiariesList;
