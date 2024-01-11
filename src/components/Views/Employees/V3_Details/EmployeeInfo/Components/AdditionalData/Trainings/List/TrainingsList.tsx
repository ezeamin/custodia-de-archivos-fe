import ListItem from './TrainingsListItem';

import { Grid } from '@/components/ui';

import { TrainingsProps } from '@/components/interface/views';

const TrainingsList = (props: TrainingsProps) => {
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
export default TrainingsList;
