import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';
import TypesForm from '@/components/Views/TypesList/V3_Licenses/TypesForm';
import TypesList from '@/components/Views/TypesList/V3_Licenses/TypesList';

const LicensesTypesView = () => {
  return (
    <>
      <Title title="Tipos de Licencias" />
      <Alert closable className="animate-in-bottom a-delay-200 mb-3">
        Crea un nuevo tipo de licencia. El título y la descripción serán
        visibles al crear una licencia de este tipo.
      </Alert>
      <TypesForm />
      <TypesList />
    </>
  );
};
export default LicensesTypesView;
