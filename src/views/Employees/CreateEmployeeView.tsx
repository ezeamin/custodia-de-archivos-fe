import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';
import CreateForm from '@/components/Views/Employees/V2_Create/CreateForm';

const CreateEmployeeView = () => {
  return (
    <>
      <Title title="Crear Nuevo Empleado" />
      <Alert className="mb-4">
        Todos los campos son obligatorios. Luego podrá cargar información
        adicional desde &quot;Detalles del empleado&quot;.
      </Alert>
      <CreateForm />
    </>
  );
};
export default CreateEmployeeView;
