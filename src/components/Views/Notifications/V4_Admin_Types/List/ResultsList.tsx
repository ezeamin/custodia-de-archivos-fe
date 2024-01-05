import ResultsListItem from './ResultsListItem';

import { Grid } from '@/components/ui';

import { NotificationsTypeResultsListProps } from '@/components/interface/views';

const ResultsList = (props: NotificationsTypeResultsListProps) => {
  const { data } = props;

  return (
    <Grid container component="section" gap={2}>
      {data.map((notificationType, index) => (
        <Grid item key={notificationType.id} lg={4} sm={6} xl={3} xs={12}>
          <ResultsListItem index={index} notificationType={notificationType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultsList;
