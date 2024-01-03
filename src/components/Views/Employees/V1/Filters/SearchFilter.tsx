import { IoSearch } from 'react-icons/io5';
import { MdFilterAlt } from 'react-icons/md';

import { usePortrait, useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Button, Icon, TextInput } from '@/components/ui';

import {
  SearchSchema,
  searchSchema,
} from '@/form-schemas/schemas/employees/searchSchema';

const SearchFilter = () => {
  const { control, onSubmitMiddleware } = useZodForm(searchSchema);

  const isPortrait = usePortrait();
  const { openModal } = useModal();

  const handleSubmit = (data: SearchSchema) => {
    console.log(data);
  };

  const handleModal = () => {
    openModal();
  };

  if (isPortrait) {
    return (
      <Button
        className="p-3 input-bordered hover:border-gray-500 w-full"
        startIcon={<MdFilterAlt />}
        type="button"
        onClick={handleModal}
      >
        Filtros
      </Button>
    );
  }

  return (
    <form
      className="flex gap-2 items-end w-full"
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
        className="p-3 input-bordered hover:border-gray-500"
        type="submit"
      >
        <Icon iconComponent={<IoSearch />} size="23px" title="buscar" />
      </Button>
      <Button
        className="p-3 input-bordered hover:border-gray-500"
        startIcon={<MdFilterAlt />}
        type="button"
        onClick={handleModal}
      >
        Filtros
      </Button>
    </form>
  );
};
export default SearchFilter;
