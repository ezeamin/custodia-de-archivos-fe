import { Link, useNavigate, useParams } from 'react-router-dom';

import EmployeeAdditionalDataTab from './Tabs/EmployeeAdditionalDataTab';
import EmployeeDocumentsTab from './Tabs/EmployeeDocumentsTab';
import EmployeeHistoryTab from './Tabs/EmployeeHistoryTab';
import EmployeePersonalTab from './Tabs/EmployeePersonalTab';

const EmployeeTabs = () => {
  const { id: employeeId, tab: currentTab } = useParams();

  const navigate = useNavigate();

  let renderedComp = null;
  switch (currentTab) {
    case 'personal':
      renderedComp = <EmployeePersonalTab />;
      break;
    case 'documents':
      renderedComp = <EmployeeDocumentsTab />;
      break;
    case 'history':
      renderedComp = <EmployeeHistoryTab />;
      break;
    case 'additional-data':
      renderedComp = <EmployeeAdditionalDataTab />;
      break;
    default:
      navigate(`/employees/${employeeId}/personal`);
      break;
  }

  return (
    <>
      <article className="animate-in-bottom a-delay-500 tabs-boxed tabs flex flex-col items-center justify-center rounded-xl bg-white p-2 shadow sm:flex-row md:flex-col lg:flex-row xl:grid xl:justify-normal dark:border dark:border-gray-600 dark:bg-slate-800">
        <div className="flex w-full flex-col xl:hidden">
          <Link
            className={`tab w-full xl:w-auto ${
              currentTab === 'personal' ? 'tab-active' : ''
            }`}
            role="tab"
            to={`/employees/${employeeId}/personal`}
          >
            Información personal
          </Link>
          <Link
            className={`tab w-full xl:w-auto ${
              currentTab === 'documents' ? 'tab-active' : ''
            }`}
            role="tab"
            to={`/employees/${employeeId}/documents`}
          >
            Documentos
          </Link>
        </div>
        <div className="flex w-full flex-col xl:hidden">
          <Link
            className={`tab w-full xl:w-auto ${
              currentTab === 'history' ? 'tab-active' : ''
            }`}
            role="tab"
            to={`/employees/${employeeId}/history`}
          >
            Historial de cambios
          </Link>
          <Link
            className={`tab w-full xl:w-auto ${
              currentTab === 'additional-data' ? 'tab-active' : ''
            }`}
            role="tab"
            to={`/employees/${employeeId}/additional-data`}
          >
            Información adicional
          </Link>
        </div>
        <Link
          className={`tab hidden xl:block ${
            currentTab === 'personal' ? 'tab-active' : ''
          }`}
          role="tab"
          to={`/employees/${employeeId}/personal`}
        >
          Información personal
        </Link>
        <Link
          className={`tab hidden xl:block ${
            currentTab === 'documents' ? 'tab-active' : ''
          }`}
          role="tab"
          to={`/employees/${employeeId}/documents`}
        >
          Documentos
        </Link>
        <Link
          className={`tab hidden xl:block ${
            currentTab === 'history' ? 'tab-active' : ''
          }`}
          role="tab"
          to={`/employees/${employeeId}/history`}
        >
          Historial de cambios
        </Link>
        <Link
          className={`tab hidden xl:block ${
            currentTab === 'additional-data' ? 'tab-active' : ''
          }`}
          role="tab"
          to={`/employees/${employeeId}/additional-data`}
        >
          Información adicional
        </Link>
      </article>
      <article className="content-card animate-in-bottom a-delay-800 card mt-3">
        {renderedComp}
      </article>
    </>
  );
};
export default EmployeeTabs;
