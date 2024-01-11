import HistoryListItem from './HistoryListItem';

import { HistoryDataProps } from '@/components/interface/views';

const HistoryList = (props: HistoryDataProps) => {
  const { data } = props;

  return (
    <section className="flex flex-col gap-3">
      {data.map((element) => (
        <HistoryListItem data={element} key={element.id} />
      ))}
    </section>
  );
};
export default HistoryList;
