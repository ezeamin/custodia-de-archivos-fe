import ResultsListItem from './ResultsListItem';

import { ResultsListProps } from '@/components/interface/views';

const ResultsList = (props: ResultsListProps) => {
  const { data } = props;

  return (
    <section className="flex md:hidden flex-col gap-3">
      {data.map((employee, index) => (
        <ResultsListItem employee={employee} index={index} key={employee.id} />
      ))}
    </section>
  );
};

export default ResultsList;
