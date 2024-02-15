import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import BeneficiariesList from './BeneficiariesList';

import { Icon } from '@/components/ui';

import { BeneficiariesProps } from '@/components/interface/views';

const Beneficiaries = (props: BeneficiariesProps) => {
  const { employeeId, isEditing, lifeInsurance } = props;
  return (
    <>
      <section className="mb-2 mt-5 flex flex-col items-center justify-between sm:flex-row">
        <h2 className="mb-2 font-bold sm:mb-0">Beneficiarios</h2>
        {isEditing ? (
          <button disabled className="disabled:text-gray-400" type="button">
            <Icon
              iconComponent={<FaPlus size="1em" />}
              title="Agregar nuevo miembro"
            />
          </button>
        ) : (
          <Link
            className="tooltip tooltip-left"
            data-tip="Agregar nuevo miembro"
            to={`/employees/${employeeId}/life-insurance/${lifeInsurance?.id}/beneficiary`}
          >
            <Icon
              iconComponent={<FaPlus size="1em" />}
              title="Agregar nuevo miembro"
            />
          </Link>
        )}
      </section>
      <BeneficiariesList
        data={lifeInsurance.beneficiaries}
        lifeInsuranceId={lifeInsurance.id}
      />
    </>
  );
};
export default Beneficiaries;
