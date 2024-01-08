import { useParams } from 'react-router-dom';

import { mockedDocs } from '../../../V4_Edit/Tabs/Results/mocked';
import DocumentItem from '../Extra/DocumentItem';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeDocsFn } from '@/api/api-calls/employees';

import { Alert, Grid } from '@/components/ui';

const data = mockedDocs;
const isError = false;

const EmployeeDocumentsTab = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isError, */ refetch } = useQuery({
    queryKey: [`employeeDocs_${employeeId}`],
    queryFn: () => getEmployeeDocsFn(employeeId!),
  });

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

  return (
    <>
      <h2 className="text-lg font-bold mb-3">Documentos</h2>
      <Alert closable className="mb-4">
        Una vez que se elimine un archivo, este no se podrá recuperar.
      </Alert>
      <Grid container gap={3}>
        {data.data.map((doc) => (
          <Grid item key={doc.id} sm={6} xs={12}>
            <DocumentItem doc={doc} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default EmployeeDocumentsTab;
