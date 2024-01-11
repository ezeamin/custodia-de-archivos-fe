import ListItem from './FormalWarningsListItem';

import { Grid } from '@/components/ui';

import { FormalWarningsProps } from '@/components/interface/views';

const FormalWarningsList = (props: FormalWarningsProps) => {
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
export default FormalWarningsList;
