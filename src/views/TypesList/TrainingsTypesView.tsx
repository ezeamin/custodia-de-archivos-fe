import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';
import TypesForm from '@/components/Views/TypesList/V4_Trainings/TypesForm';
import TypesList from '@/components/Views/TypesList/V4_Trainings/TypesList';

const TrainingsTypesView = () => {
  return (
    <>
      <Title title="Tipos de Capacitaciones" />
      <Alert closable className="mb-3 animate-in-bottom a-delay-200">
        Crea un nuevo tipo de capacitación. El título y la descripción serán
        visibles al crear una capacitación de este tipo.
      </Alert>
      <TypesForm />
      <TypesList />
    </>
  );
};
export default TrainingsTypesView;
