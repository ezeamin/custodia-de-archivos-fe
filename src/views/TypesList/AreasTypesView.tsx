import Title from '@/components/Common/Title';
import TypesForm from '@/components/Views/TypesList/V5_Areas/TypesForm';
import TypesList from '@/components/Views/TypesList/V5_Areas/TypesList';

const AreasTypesView = () => {
  return (
    <>
      <Title title="Tipos de Áreas" />
      <TypesForm />
      <TypesList />
    </>
  );
};
export default AreasTypesView;
