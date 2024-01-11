import ListItem from './AbsencesListItem';

import { Grid } from '@/components/ui';

import { AbsenceProps } from '@/components/interface/views';

const AbsencesList = (props: AbsenceProps) => {
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
export default AbsencesList;
