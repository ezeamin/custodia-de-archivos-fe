import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import BeneficiariesList from './BeneficiariesList';

import { Alert, Icon } from '@/components/ui';

import { BeneficiariesProps } from '@/components/interface/views';

const Beneficiaries = (props: BeneficiariesProps) => {
  const { employeeId, isEditing, lifeInsurance } = props;

  const totalPercentage = lifeInsurance?.beneficiaries.reduce(
    (acc, beneficiary) => acc + beneficiary.percentage,
    0
  );

  if (!lifeInsurance) return null;

  return (
    <>
      <section className="mb-2 mt-5 flex items-center justify-between">
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
      {lifeInsurance?.beneficiaries.length > 0 &&
        (totalPercentage > 100.1 || totalPercentage < 99.9) && (
          <Alert className="mb-2" type="warning">
            Atención: La suma de los porcentajes no da 100. Por favor, revise la
            información ingresada
          </Alert>
        )}
      {lifeInsurance?.beneficiaries.length === 0 && (
        <p className="my-3 text-center">
          <span>
            No hay beneficiarios registrados. Agregue uno nuevo desde el botón{' '}
          </span>
          <FaPlus className="ms-1 inline text-xs" />
        </p>
      )}
      <BeneficiariesList
        data={lifeInsurance?.beneficiaries || []}
        lifeInsuranceId={lifeInsurance?.id}
      />
    </>
  );
};
export default Beneficiaries;
