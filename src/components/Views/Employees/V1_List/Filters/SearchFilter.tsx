import { useEffect } from 'react';
import { IoSearch, IoTrash } from 'react-icons/io5';
import { MdFilterAlt } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Button, Grid, Icon, TextInput } from '@/components/ui';

import {
  SearchSchema,
  searchSchema,
} from '@/form-schemas/schemas/employees/searchSchema';

import { SearchFilterProps } from '@/components/interface/views';

const SearchFilter = (props: SearchFilterProps) => {
  const { queryKey, showFilters } = props;

  const { control, onSubmitMiddleware, setValue, reset, watch } =
    useZodForm(searchSchema);

  const query = watch('query');

  const location = useLocation();
  const { openModal } = useModal();

  const queryClient = useQueryClient();

  const handleSubmit = (data: SearchSchema) => {
    const { search } = location;

    const params = new URLSearchParams(search);
    params.set('query', data.query);

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );

    queryClient.invalidateQueries({
      queryKey: [queryKey],
    });
  };

  const handleModal = () => {
    if (!showFilters) return;
    openModal('employeeSearchFilter');
  };

  const handleClear = () => {
    const { search } = location;

    const params = new URLSearchParams(search);
    params.delete('query');

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );

    queryClient.invalidateQueries({
      queryKey: [queryKey],
    });

    reset();
  };

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('query');
    if (searchQuery) {
      setValue('query', searchQuery);
    }
  }, [setValue, location]);

  return (
    <form className="w-full" onSubmit={onSubmitMiddleware(handleSubmit)}>
      <div className="mb-3 flex gap-1 md:mb-0">
        <TextInput
          hideLabel
          className="mt-0 block w-full md:hidden"
          control={control}
          label="Buscar"
          name="query"
          placeholder="Buscar por nombre o apellido"
        />
        <Button
          className="input-bordered p-3 hover:border-gray-500 md:hidden"
          type="submit"
        >
          <Icon iconComponent={<IoSearch />} size="23px" title="buscar" />
        </Button>
      </div>
      <Grid container className="md:hidden" gap={2}>
        {showFilters && (
          <Grid item xs={6}>
            <Button
              disabled
              className="input-bordered w-full p-3 hover:border-gray-500"
              startIcon={<MdFilterAlt />}
              type="button"
              onClick={handleModal}
            >
              Filtros
            </Button>
          </Grid>
        )}
        <Grid item xs={showFilters ? 6 : 12}>
          <Button
            className="input-bordered w-full p-3 hover:border-gray-500"
            disabled={!query || query?.length === 0}
            startIcon={<IoTrash />}
            onClick={handleClear}
          >
            Limpiar
          </Button>
        </Grid>
      </Grid>
      <div className="hidden w-full items-end gap-2 md:flex">
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
        {showFilters && (
          <Button
            disabled
            className="input-bordered p-3 hover:border-gray-500"
            startIcon={<MdFilterAlt />}
            type="button"
            onClick={handleModal}
          >
            Filtros
          </Button>
        )}
        <Button
          className="input-bordered p-3 hover:border-gray-500"
          disabled={!query || query?.length === 0}
          onClick={handleClear}
        >
          <Icon iconComponent={<IoTrash />} size="23px" title="Limpiar" />
        </Button>
      </div>
    </form>
  );
};
export default SearchFilter;
