// import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

const FilterModalForm = () => {
  const { closeModal } = useModal();

  //   const { control, handleSubmitMiddleware } = useZodForm(searchSchema);

  const handleSubmit = (data: unknown) => {
    console.log(data);
    closeModal();
  };

  return <form onSubmit={handleSubmit}>Acá iria un formulario lol xd</form>;
};
export default FilterModalForm;
