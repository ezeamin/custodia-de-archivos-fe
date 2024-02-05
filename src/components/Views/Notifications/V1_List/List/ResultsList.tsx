import ResultsListItem from './ResultsListItem';

import { Grid } from '@/components/ui';

import { NotificationsResultsListProps } from '@/components/interface/views';

const ResultsList = (props: NotificationsResultsListProps) => {
  const { data, sent = false, hasBeenRead = true } = props;

  return (
    <Grid container component="section" gap={2}>
      {data.map((notification, index) => (
        <Grid item key={notification.id} lg={4} sm={6} xl={3} xs={12}>
          <ResultsListItem
            hasBeenRead={hasBeenRead}
            index={index}
            notification={notification}
            sent={sent}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultsList;
