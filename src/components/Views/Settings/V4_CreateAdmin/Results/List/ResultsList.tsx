import ResultsListItem from './ResultsListItem';

import { CreateAdminResults } from '@/components/interface/views';

const ResultsList = (props: CreateAdminResults) => {
  const { data } = props;

  return (
    <section className="flex flex-col gap-3 md:hidden">
      {data.map((user, index) => (
        <ResultsListItem index={index} key={user.id} user={user} />
      ))}
    </section>
  );
};

export default ResultsList;
