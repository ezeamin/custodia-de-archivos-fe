import ListItem from './ExtraHoursListItem';

import { ExtraHoursProps } from '@/components/interface/views';

const ExtraHoursList = (props: ExtraHoursProps) => {
  const { data } = props;

  return (
    <section className="flex flex-col gap-3">
      {data.map((element) => (
        <ListItem data={element} key={element.id} />
      ))}
    </section>
  );
};
export default ExtraHoursList;
