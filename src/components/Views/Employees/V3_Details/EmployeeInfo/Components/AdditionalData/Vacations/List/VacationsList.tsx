import ListItem from './VacationsListItem';

import { Grid } from '@/components/ui';

import { VacationsProps } from '@/components/interface/views';

const VacationsList = (props: VacationsProps) => {
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
export default VacationsList;
