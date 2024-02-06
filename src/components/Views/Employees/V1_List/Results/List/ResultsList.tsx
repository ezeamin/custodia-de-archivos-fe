import ResultsListItem from './ResultsListItem';

import { EmployeesResultsListProps } from '@/components/interface/views';

const ResultsList = (props: EmployeesResultsListProps) => {
  const { data } = props;

  return (
    <section className="flex flex-col gap-3 lg:hidden">
      {data.map((employee, index) => (
        <ResultsListItem employee={employee} index={index} key={employee.id} />
      ))}
    </section>
  );
};

export default ResultsList;
