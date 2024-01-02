import { ResultsListProps } from '@/components/interface/views';

const ResultsList = (props: ResultsListProps) => {
  const { data } = props;

  console.log(data);

  return <div>ResultsList</div>;
};
export default ResultsList;
