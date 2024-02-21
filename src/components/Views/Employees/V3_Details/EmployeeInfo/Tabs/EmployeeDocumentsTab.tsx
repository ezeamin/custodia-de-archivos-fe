import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import ChangeDocumentNameModal from '../Components/Documents/ChangeDocumentNameModal';
import DocumentListModal from '../Components/Documents/DocumentListModal';
import FolderItem from '../Components/Documents/FolderItem';
import AddNewDocument from '../Components/Documents/NewDocument/AddNewDocument';
import AddNewDocumentModal from '../Components/Documents/NewDocument/AddNewDocumentModal';
import AddNewFolder from '../Components/Documents/NewFolder/AddNewFolder';
import AddNewFolderModal from '../Components/Documents/NewFolder/AddNewFolderModal';
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
    queryKey: ['employeeDocs', employeeId],
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
        <div className="flex flex-col gap-2 sm:flex-row md:flex-row">
          <AddNewFolder />
          <AddNewDocument />
        </div>
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
              <FolderItem folder={undefined} />
            </Grid>
            <Grid item className="mt-4" md={12} sm={6} xl={6} xs={12}>
              <FolderItem folder={undefined} />
            </Grid>
          </>
        )}
        {!isFetching &&
          data?.data?.map((folder) => (
            <Grid item key={folder.id} md={12} sm={6} xl={6} xs={12}>
              <FolderItem folder={folder} />
            </Grid>
          ))}
      </Grid>

      {createPortal(<DocumentListModal />, document.body)}
      {createPortal(<ChangeDocumentNameModal />, document.body)}
      {createPortal(<AddNewDocumentModal />, document.body)}
      {createPortal(<AddNewFolderModal />, document.body)}
    </>
  );
};
export default EmployeeDocumentsTab;
