import { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import LifeInsuranceEditPanel from './LifeInsuranceEditPanel';
import LifeInsuranceInfoPanel from './LifeInsuranceInfoPanel';

import { useModal } from '@/stores/useModal';

import { Icon, Modal } from '@/components/ui';

import { LifeInsuranceModalData } from '@/components/interface/views';

const LifeInsuranceInfoModal = () => {
  const { id: employeeId } = useParams();
  const { data: lifeInsurance } = useModal() as LifeInsuranceModalData;

  const [isEditing, setIsEditing] = useState(false);

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  // TODO: Cancel button, edit form

  return (
    <Modal className="overflow-x-hidden px-1" id="lifeInsuranceInfo" title="">
      <section className="flex">
        <h2 className="font-bold">Seguro de vida</h2>
        {!isEditing && (
          <button type="button" onClick={handleClickEdit}>
            <Icon iconComponent={<FaPencil size="1em" />} title="Editar" />
          </button>
        )}
      </section>
      {isEditing ? (
        <LifeInsuranceEditPanel data={lifeInsurance} />
      ) : (
        <LifeInsuranceInfoPanel data={lifeInsurance} />
      )}
      <section className="flex">
        <h2 className="mt-3 font-bold">Beneficiarios</h2>
        <Link
          className="btn btn-primary"
          to={`/employees/${employeeId}/life-insurance/${lifeInsurance?.id}/beneficiary`}
          // to={`/employees/${employeeId}/life-insurance/${lifeInsurance?.id}/beneficiary/${beneficiary?.id}`}
        >
          AGREGAR BENEFICIARIO
        </Link>
      </section>
      <p className="text-center">Acá iría la lista de beneficiarios lol xd</p>
    </Modal>
  );
};
export default LifeInsuranceInfoModal;
