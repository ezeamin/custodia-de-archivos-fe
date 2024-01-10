import ListItem from './LateArrivalsListItem';

import { LateArrivalsProps } from '@/components/interface/views';

const LateArrivalsList = (props: LateArrivalsProps) => {
  const { data } = props;

  return (
    <section className="flex flex-col gap-3">
      {data.map((element) => (
        <ListItem data={element} key={element.id} />
      ))}
    </section>
  );
};
export default LateArrivalsList;
