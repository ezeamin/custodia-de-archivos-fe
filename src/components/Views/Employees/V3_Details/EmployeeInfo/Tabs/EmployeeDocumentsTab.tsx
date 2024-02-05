import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import AddNewDocument from '../Components/Documents/AddNewDocument';
import AddNewDocumentModal from '../Components/Documents/AddNewDocumentModal';
import ChangeDocumentNameModal from '../Components/Documents/ChangeDocumentNameModal';
import DocumentItem from '../Components/Documents/DocumentItem';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeDocsFn } from '@/api/api-calls/employees';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Grid } from '@/components/ui';

const EmployeeDocumentsTab = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isFetching, isError, refetch } = useQuery({
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
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  return (
    <>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:flex-col md:justify-between lg:flex-row lg:items-center">
        <h2 className="text-lg font-bold">Documentos</h2>
        <AddNewDocument />
      </div>
      {data?.data?.length && data.data.length > 0 ? (
        <Alert closable className="mb-4 mt-2">
          Una vez que se elimine un archivo, este no se podrá recuperar.
        </Alert>
      ) : (
        <Alert className="mt-2">
          Aún no se cargaron documentos para este empleado.
        </Alert>
      )}
      <Grid container gap={3}>
        {isFetching && (
          <>
            <Grid item className="mt-4" md={12} sm={6} xl={6} xs={12}>
              <DocumentItem doc={undefined} />
            </Grid>
            <Grid item className="mt-4" md={12} sm={6} xl={6} xs={12}>
              <DocumentItem doc={undefined} />
            </Grid>
          </>
        )}
        {!isFetching &&
          data?.data?.map((doc) => (
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
