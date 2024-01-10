import ListItem from './LicensesListItem';

import { LicensesProps } from '@/components/interface/views';

const LicensesList = (props: LicensesProps) => {
  const { data } = props;

  return (
    <section className="flex flex-col gap-3">
      {data.map((element) => (
        <ListItem data={element} key={element.id} />
      ))}
    </section>
  );
};
export default LicensesList;
