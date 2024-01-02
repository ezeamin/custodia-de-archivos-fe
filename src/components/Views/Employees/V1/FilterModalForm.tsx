// import { useZodForm } from '@/hooks';
import { FilterModalFormProps } from '@/components/interface/views';

const FilterModalForm = (props: FilterModalFormProps) => {
  const { closeModal } = props;

  //   const { control, handleSubmitMiddleware } = useZodForm(searchSchema);

  const handleSubmit = (data: unknown) => {
    console.log(data);
    closeModal();
  };

  return <form onSubmit={handleSubmit}>Acá iria un formulario lol xd</form>;
};
export default FilterModalForm;
