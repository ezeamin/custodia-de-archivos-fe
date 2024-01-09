import { useParams } from 'react-router-dom';

import { mockedEmployee } from '../../../V3_Details/mocked';
import EditContactForm from '../Forms/EditContactForm';
import EditJobForm from '../Forms/EditJobForm';
import EditPersonalForm from '../Forms/EditPersonalForm';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import { Alert } from '@/components/ui';

const data = mockedEmployee;
const isError = false;
const isLoading = false;

const GlobalEmployeeResults = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId, subtab: editSubtab } = params;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: [`employee_${employeeId}`],
    queryFn: () => getEmployeeFn(employeeId!),
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return (
      <Alert className="mt-3 animate-in-right a-delay-500" type="error">
        <p>
          Ocurrió un error leyendo la información. Por favor, intente nuevamente
          en unos instantes o reintente utilizando el botón debajo de este
          mensaje.
        </p>
        <button className="btn mt-2" type="button" onClick={handleRetry}>
          Reintentar
        </button>
      </Alert>
    );
  }

  if (data?.data) {
    let renderedComp = null;
    switch (editSubtab) {
      case 'personal':
        renderedComp = <EditPersonalForm data={data.data} />;
        break;
      case 'job':
        renderedComp = <EditJobForm data={data.data} />;
        break;
      case 'contact':
        renderedComp = <EditContactForm data={data.data} />;
        break;
      default:
        break;
    }

    return <section className="mt-5 overflow-hidden">{renderedComp}</section>;
  }

  return null;
};
export default GlobalEmployeeResults;
