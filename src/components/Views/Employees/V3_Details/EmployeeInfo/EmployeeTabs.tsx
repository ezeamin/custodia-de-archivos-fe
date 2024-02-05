import { Link, useNavigate, useParams } from 'react-router-dom';

import EmployeeTabsBackdrop from './EmployeeTabsBackdrop';
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
      <article
        className="animate-in-bottom a-delay-500 tabs-boxed tabs relative flex flex-col items-center justify-center rounded-xl bg-white p-2 shadow dark:border dark:border-gray-600 dark:bg-slate-800 sm:flex-row sm:gap-1 md:flex-col md:gap-0 lg:flex-row lg:gap-1 xl:grid xl:justify-normal"
        id="tabs-selector"
      >
        <div className="flex w-full flex-col xl:hidden">
          <Link
            className={`tab w-full font-bold xl:w-auto ${
              currentTab === 'personal' ? 'tab-active' : ''
            }`}
            role="tab"
            to={`/employees/${employeeId}/personal`}
          >
            Información personal
          </Link>
          <Link
            className={`tab w-full font-bold xl:w-auto ${
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
            className={`tab w-full font-bold xl:w-auto ${
              currentTab === 'history' ? 'tab-active' : ''
            }`}
            role="tab"
            to={`/employees/${employeeId}/history`}
          >
            Historial de cambios
          </Link>
          <Link
            className={`tab w-full font-bold xl:w-auto ${
              currentTab === 'additional-data' ? 'tab-active' : ''
            }`}
            role="tab"
            to={`/employees/${employeeId}/additional-data`}
          >
            Información adicional
          </Link>
        </div>
        <Link
          className={`tab hidden items-center font-bold transition-colors xl:flex ${
            currentTab === 'personal' ? 'tab-active' : ''
          }`}
          role="tab"
          to={`/employees/${employeeId}/personal`}
        >
          Información personal
        </Link>
        <Link
          className={`tab hidden items-center font-bold transition-colors xl:flex ${
            currentTab === 'documents' ? 'tab-active' : ''
          }`}
          role="tab"
          to={`/employees/${employeeId}/documents`}
        >
          Documentos
        </Link>
        <Link
          className={`tab hidden items-center font-bold transition-colors xl:flex ${
            currentTab === 'history' ? 'tab-active' : ''
          }`}
          role="tab"
          to={`/employees/${employeeId}/history`}
        >
          Historial de cambios
        </Link>
        <Link
          className={`tab hidden items-center font-bold transition-colors xl:flex ${
            currentTab === 'additional-data' ? 'tab-active' : ''
          }`}
          role="tab"
          to={`/employees/${employeeId}/additional-data`}
        >
          Información adicional
        </Link>
        <EmployeeTabsBackdrop />
      </article>
      <article className="content-card animate-in-bottom a-delay-800 card mt-3 overflow-x-auto">
        {renderedComp}
      </article>
    </>
  );
};
export default EmployeeTabs;
