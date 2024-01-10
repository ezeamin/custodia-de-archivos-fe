import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { mockedDocs } from '../../mocked';
import AddNewDocument from '../Components/Documents/AddNewDocument';
import AddNewDocumentModal from '../Components/Documents/AddNewDocumentModal';
import ChangeDocumentNameModal from '../Components/Documents/ChangeDocumentNameModal';
import DocumentItem from '../Components/Documents/DocumentItem';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeDocsFn } from '@/api/api-calls/employees';

import { Alert, Grid } from '@/components/ui';

const data = mockedDocs;
const isLoading = false;
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
      <>
        <h2 className="text-lg font-bold">Documentos</h2>
        <Alert className="mt-3 animate-in-right a-delay-500" type="error">
          <p>
            Ocurrió un error leyendo la información. Por favor, intente
            nuevamente en unos instantes o reintente utilizando el botón debajo
            de este mensaje.
          </p>
          <button className="btn mt-2" type="button" onClick={handleRetry}>
            Reintentar
          </button>
        </Alert>
      </>
    );
  }

  return (
    <>
      <div className="mb-3 gap-2 flex sm:items-center lg:items-center flex-col sm:flex-row md:flex-col lg:flex-row sm:justify-between md:justify-between">
        <h2 className="text-lg font-bold">Documentos</h2>
        <AddNewDocument />
      </div>
      <Alert closable className="mb-4">
        Una vez que se elimine un archivo, este no se podrá recuperar.
      </Alert>
      <Grid container gap={3}>
        {isLoading && (
          <>
            <Grid item md={12} sm={6} xl={6} xs={12}>
              <DocumentItem doc={undefined} />
            </Grid>
            <Grid item md={12} sm={6} xl={6} xs={12}>
              <DocumentItem doc={undefined} />
            </Grid>
          </>
        )}
        {data.data.map((doc) => (
          <Grid item key={doc.id} md={12} sm={6} xl={6} xs={12}>
            <DocumentItem doc={doc} />
          </Grid>
        ))}
      </Grid>

      {createPortal(<ChangeDocumentNameModal />, document.body)}
      {createPortal(<AddNewDocumentModal />, document.body)}
    </>
  );
};
export default EmployeeDocumentsTab;
