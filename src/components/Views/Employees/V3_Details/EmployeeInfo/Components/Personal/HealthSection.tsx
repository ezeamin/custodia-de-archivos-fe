import { createPortal } from 'react-dom';
import { FaPlus } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import EmployeeDataField from '../../EmployeeDataField';
import CreateLifeInsuranceModal from './Health/CreateLifeInsurance/CreateLifeInsuranceModal';
import FitMessage from './Health/FitMessage';
import LifeInsurancesList from './Health/LifeInsurancesList';

import { useModal } from '@/stores/useModal';

import { Grid, Icon } from '@/components/ui';

import { PersonalProps } from '@/components/interface/views';

const HealthSection = (props: PersonalProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();
  const { openModal } = useModal();

  const handleOpenCreateLifeInsuranceModal = () => {
    openModal('lifeInsuranceForm');
  };

  return (
    <>
      <article>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Información de salud</h2>
          <Link
            className="tooltip tooltip-left"
            data-tip="Editar"
            to={`/employees/${employeeId}/edit/health`}
          >
            <Icon iconComponent={<FaPencil size="1em" />} title="Editar" />
          </Link>
        </div>
        <h3 className="mb-1">Obra Social</h3>
        <Grid container component="section" gap={2}>
          <Grid item lg={6} xs={12}>
            <EmployeeDataField
              label="Nombre"
              value={data?.healthInsurance ? data?.healthInsurance.name : 'N/A'}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <EmployeeDataField
              label="Número de Afiliado"
              value={
                data?.healthInsurance
                  ? data?.healthInsurance.affiliateNumber
                  : 'N/A'
              }
            />
          </Grid>
        </Grid>
        {/* Preocupacionales */}
        <FitMessage data={data?.preoccupationalCheckup || null} />
        <EmployeeDataField
          label="Observaciones"
          value={data?.preoccupationalCheckup?.observations || 'N/A'}
        />
        {/* Beneficiarios de Seguro de Vida */}
        <div className="flex items-center justify-between">
          <h3 className="mb-1 mt-3">Seguros de vida</h3>
          <button
            className="tooltip tooltip-left"
            data-tip="Agregar nuevo seguro"
            type="button"
            onClick={handleOpenCreateLifeInsuranceModal}
          >
            <Icon
              iconComponent={<FaPlus size="1em" />}
              title="Agregar nuevo seguro"
            />
          </button>
        </div>
        <LifeInsurancesList data={data?.lifeInsurances || []} />
      </article>

      {createPortal(<CreateLifeInsuranceModal />, document.body)}
    </>
  );
};
export default HealthSection;
