import ResultsListItem from './ResultsListItem';

import { Grid } from '@/components/ui';

import { AreaResultsListProps } from '@/components/interface/views';

const ResultsList = (props: AreaResultsListProps) => {
  const { data } = props;

  return (
    <Grid container component="section" gap={2}>
      {data.map((area, index) => (
        <Grid item key={area.id} lg={4} sm={6} xl={3} xs={12}>
          <ResultsListItem area={area} index={index} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultsList;
