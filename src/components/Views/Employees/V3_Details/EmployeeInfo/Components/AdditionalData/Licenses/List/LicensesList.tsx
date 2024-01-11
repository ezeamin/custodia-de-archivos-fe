import ListItem from './LicensesListItem';

import { Grid } from '@/components/ui';

import { LicensesProps } from '@/components/interface/views';

const LicensesList = (props: LicensesProps) => {
  const { data } = props;

  return (
    <Grid container gap={3}>
      {data.map((element) => (
        <Grid item key={element.id} md={6} xs={12}>
          <ListItem data={element} />
        </Grid>
      ))}
    </Grid>
  );
};
export default LicensesList;
