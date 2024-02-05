import ResultsListItem from './ResultsListItem';

import { LoginLogsResults } from '@/components/interface/views';

const ResultsList = (props: LoginLogsResults) => {
  const { data } = props;

  return (
    <section className="flex flex-col gap-3 md:hidden">
      {data.map((log, index) => (
        <ResultsListItem index={index} key={log.id} log={log} />
      ))}
    </section>
  );
};

export default ResultsList;
