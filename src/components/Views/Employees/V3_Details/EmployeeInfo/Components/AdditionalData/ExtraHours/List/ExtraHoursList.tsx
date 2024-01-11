import ListItem from './ExtraHoursListItem';

import { Grid } from '@/components/ui';

import { ExtraHoursProps } from '@/components/interface/views';

const ExtraHoursList = (props: ExtraHoursProps) => {
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
export default ExtraHoursList;
