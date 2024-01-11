import ResultsListItem from './ResultsListItem';

import { Grid } from '@/components/ui';

import { TrainingTypesResultsListProps } from '@/components/interface/views';

const ResultsList = (props: TrainingTypesResultsListProps) => {
  const { data } = props;

  return (
    <Grid container component="section" gap={2}>
      {data.map((trainingType, index) => (
        <Grid item key={trainingType.id} lg={4} sm={6} xl={3} xs={12}>
          <ResultsListItem index={index} trainingType={trainingType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultsList;
