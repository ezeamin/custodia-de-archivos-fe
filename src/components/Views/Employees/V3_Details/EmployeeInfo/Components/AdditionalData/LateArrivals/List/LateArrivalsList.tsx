import ListItem from './LateArrivalsListItem';

import { Grid } from '@/components/ui';

import { LateArrivalsProps } from '@/components/interface/views';

const LateArrivalsList = (props: LateArrivalsProps) => {
  const { data } = props;

  return (
    <Grid container gap={3}>
      {data.map((element) => (
        <Grid item key={element.id} lg={6} xs={12}>
          <ListItem data={element} />
        </Grid>
      ))}
    </Grid>
  );
};
export default LateArrivalsList;
