import { FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

import FamilyList from './Family/FamilyList';

import { Icon } from '@/components/ui';

import { PersonalProps } from '@/components/interface/views';

const FamilySection = (props: PersonalProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  return (
    <article>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold">Información familiar</h2>
        <Link
          className="tooltip tooltip-left"
          data-tip="Agregar nuevo miembro"
          to={`/employees/${employeeId}/family`}
        >
          <Icon
            iconComponent={<FaPlus size="1em" />}
            title="Agregar nuevo miembro"
          />
        </Link>
      </div>
      <FamilyList data={data?.familyMembers || []} />
    </article>
  );
};
export default FamilySection;
