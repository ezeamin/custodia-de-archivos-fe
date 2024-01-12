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
      <article className="tabs tabs-boxed flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center xl:grid xl:justify-normal animate-in-bottom a-delay-500 dark:border dark:border-gray-600 bg-white dark:bg-slate-800 rounded-xl shadow p-2">
        <div className="flex flex-col w-full xl:hidden">
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
        <div className="flex flex-col w-full xl:hidden">
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
      <article className="card content-card mt-3 animate-in-bottom a-delay-800">
        {renderedComp}
      </article>
    </>
  );
};
export default EmployeeTabs;
