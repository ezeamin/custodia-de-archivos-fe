import { IoSearch } from 'react-icons/io5';
import { MdFilterAlt } from 'react-icons/md';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Button, Icon, TextInput } from '@/components/ui';

import {
  SearchSchema,
  searchSchema,
} from '@/form-schemas/schemas/employees/searchSchema';

const SearchFilter = () => {
  const { control, onSubmitMiddleware } = useZodForm(searchSchema);

  const { openModal } = useModal();

  const handleSubmit = (data: SearchSchema) => {
    console.log(data);
  };

  const handleModal = () => {
    openModal('employeeSearchFilter');
  };

  return (
    <>
      <Button
        disabled
        className="input-bordered w-full p-3 hover:border-gray-500 md:hidden"
        startIcon={<MdFilterAlt />}
        type="button"
        onClick={handleModal}
      >
        Filtros
      </Button>
      <form
        className="hidden w-full items-end gap-2 md:flex"
        onSubmit={onSubmitMiddleware(handleSubmit)}
      >
        <TextInput
          hideLabel
          className="w-full md:w-96"
          control={control}
          label="Buscar"
          name="query"
          placeholder="Buscar por nombre o apellido"
        />
        <Button
          className="input-bordered p-3 hover:border-gray-500"
          type="submit"
        >
          <Icon iconComponent={<IoSearch />} size="23px" title="buscar" />
        </Button>
        <Button
          disabled
          className="input-bordered p-3 hover:border-gray-500"
          startIcon={<MdFilterAlt />}
          type="button"
          onClick={handleModal}
        >
          Filtros
        </Button>
      </form>
    </>
  );
};
export default SearchFilter;
