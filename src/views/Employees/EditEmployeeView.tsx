import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'sonner';

import Title from '@/components/Common/Title';
import GlobalEmployeeResults from '@/components/Views/Employees/V4_Edit/Tabs/Results/GlobalEmployeeResults';

import { uuidRegex } from '@/constants/regex/regex';

const validEditTabs = ['personal', 'job', 'contact', 'health'];

const EditEmployeeView = () => {
  const { id: employeeId, subtab: editSubtab } = useParams();

  const navigate = useNavigate();

  if (
    !employeeId ||
    !editSubtab ||
    !uuidRegex.test(employeeId) ||
    validEditTabs.indexOf(editSubtab) === -1
  ) {
    toast.error('No se puede realizar la acción solicitada');
    navigate(`/employees/${employeeId}/personal`);
  }

  return (
    <>
      <Title
        buttonClassName="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 border-none"
        buttonText="Cancelar edición"
        href={`/employees/${employeeId}/personal`}
        title="Editar Empleado"
      />
      <GlobalEmployeeResults />
    </>
  );
};
export default EditEmployeeView;
