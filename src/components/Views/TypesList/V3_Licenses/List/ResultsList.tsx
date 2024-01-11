import ResultsListItem from './ResultsListItem';

import { Grid } from '@/components/ui';

import { LicensesTypesResultsListProps } from '@/components/interface/views';

const ResultsList = (props: LicensesTypesResultsListProps) => {
  const { data } = props;

  return (
    <Grid container component="section" gap={2}>
      {data.map((licenseType, index) => (
        <Grid item key={licenseType.id} lg={4} sm={6} xl={3} xs={12}>
          <ResultsListItem index={index} licenseType={licenseType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultsList;
