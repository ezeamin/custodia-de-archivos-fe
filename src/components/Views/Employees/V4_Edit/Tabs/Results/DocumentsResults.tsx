import { useParams } from 'react-router-dom';

import EditDocumentsForm from '../Forms/EditDocumentsForm';
import { mockedDocs } from './mocked';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeDocsFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import { Alert } from '@/components/ui';

const data = mockedDocs;
const isError = false;
const isLoading = false;

const DocumentsResults = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: [`employeeDocs_${employeeId}`],
    queryFn: () => getEmployeeDocsFn(employeeId!),
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
    return (
      <section className="mt-5 overflow-hidden">
        <EditDocumentsForm data={data.data} />
      </section>
    );
  }

  return null;
};
export default DocumentsResults;
