import { useParams } from 'react-router-dom';

import { mockedHistory } from '../../mocked';
import HistoryList from '../Components/History/List/HistoryList';
import HistoryTable from '../Components/History/Table/HistoryTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeHistoryFn } from '@/api/api-calls/employees';

import { Alert } from '@/components/ui';

const data = mockedHistory;
const isLoading = false;
const isError = false;

const EmployeeHistoryTab = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  // TODO: "field" should be changed to show a label on the backend

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch } = useQuery({
    queryKey: [`employeeDocs_${employeeId}`],
    queryFn: () => getEmployeeHistoryFn(employeeId!),
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
      <h2 className="text-lg font-bold mb-3">Historial de cambios</h2>

      {isLoading && (
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
        </div>
      )}

      <section className="hidden sm:block md:hidden lg:block">
        <HistoryTable data={data.data} />
      </section>
      <section className="sm:hidden md:block lg:hidden">
        <HistoryList data={data.data} />
      </section>
      {/* <Grid container gap={3}>
        {data.data.map((doc) => (
          <Grid item key={doc.id} md={12} sm={6} xl={6} xs={12}>
            <DocumentItem doc={doc} />
          </Grid>
        ))}
      </Grid>
      {createPortal(<ChangeDocumentNameModal />, document.body)} */}
    </>
  );
};
export default EmployeeHistoryTab;
