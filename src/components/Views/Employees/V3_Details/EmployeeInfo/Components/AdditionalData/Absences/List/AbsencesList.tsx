import ListItem from './AbsencesListItem';

import { AbsenceProps } from '@/components/interface/views';

const AbsencesList = (props: AbsenceProps) => {
  const { data } = props;

  return (
    <section className="flex flex-col gap-3">
      {data.map((element) => (
        <ListItem data={element} key={element.id} />
      ))}
    </section>
  );
};
export default AbsencesList;
