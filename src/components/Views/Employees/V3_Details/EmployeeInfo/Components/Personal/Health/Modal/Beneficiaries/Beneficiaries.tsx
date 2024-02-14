import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';

import { BeneficiariesProps } from '@/components/interface/views';

const Beneficiaries = (props: BeneficiariesProps) => {
  const { employeeId, isEditing, lifeInsurance } = props;
  return (
    <>
      <section className="mt-5 flex flex-col items-center justify-between sm:flex-row">
        <h2 className="mb-2 font-bold sm:mb-0">Beneficiarios</h2>
        {isEditing ? (
          <Button
            disabled
            className="mb-3 w-full animate-none sm:mb-0 sm:w-auto"
            colorLight="btn-primary"
          >
            AGREGAR BENEFICIARIO
          </Button>
        ) : (
          <Link
            className="btn btn-primary mb-3 w-full text-white sm:mb-0 sm:w-auto"
            to={`/employees/${employeeId}/life-insurance/${lifeInsurance?.id}/beneficiary`}
            // to={`/employees/${employeeId}/life-insurance/${lifeInsurance?.id}/beneficiary/${beneficiary?.id}`}
          >
            AGREGAR BENEFICIARIO
          </Link>
        )}
      </section>
      <p className="mt-3 text-center">
        Acá iría la lista de beneficiarios lol xd
      </p>
    </>
  );
};
export default Beneficiaries;
