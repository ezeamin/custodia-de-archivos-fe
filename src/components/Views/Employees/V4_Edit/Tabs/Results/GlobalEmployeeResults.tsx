import { useParams } from 'react-router-dom';

import EditContactForm from '../Forms/EditContactForm';
import EditFamilyForm from '../Forms/EditFamilyForm';
import EditJobForm from '../Forms/EditJobForm';
import EditPersonalForm from '../Forms/EditPersonalForm';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';

const GlobalEmployeeResults = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId, subtab: editSubtab } = params;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isError, refetch, status } = useQuery({
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
    return <ErrorMessage refetch={handleRetry} />;
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
      case 'family':
        renderedComp = <EditFamilyForm data={data.data} />;
        break;
      default:
        break;
    }

    return <section className="mt-5">{renderedComp}</section>;
  }

  return null;
};
export default GlobalEmployeeResults;
