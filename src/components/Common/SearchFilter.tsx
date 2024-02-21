import { useEffect } from 'react';
import { IoSearch, IoTrash } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { useZodForm } from '@/hooks';

import { Button, Grid, Icon, TextInput } from '@/components/ui';

import { cn } from '@/utilities';

import {
  SearchSchema,
  searchSchema,
} from '@/form-schemas/schemas/employees/searchSchema';

import { SearchFilterProps } from '@/components/interface/views';

const SearchFilter = (props: SearchFilterProps) => {
  const { queryKey, placeholder, className, defaultEntries = 10 } = props;

  const { control, onSubmitMiddleware, setValue, reset, watch } =
    useZodForm(searchSchema);

  const query = watch('query');

  const location = useLocation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleSubmit = (data: SearchSchema) => {
    const { search } = location;

    const params = new URLSearchParams(search);
    params.set('query', data.query);
    params.set('page', '0');
    params.set('entries', defaultEntries.toString());

    navigate(`${window.location.pathname}?${params.toString()}`);

    queryClient.invalidateQueries({
      queryKey: typeof queryKey === 'string' ? [queryKey] : queryKey,
    });
  };

  const handleClear = () => {
    const { search } = location;

    const params = new URLSearchParams(search);
    params.delete('query');
    params.set('page', '0');
    params.set('entries', '10');

    navigate(`${window.location.pathname}?${params.toString()}`);

    queryClient.invalidateQueries({
      queryKey: typeof queryKey === 'string' ? [queryKey] : queryKey,
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
    <form
      className={cn('w-full', className)}
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <div className="mb-3 flex gap-1 md:mb-0">
        <TextInput
          hideLabel
          className="mt-0 block w-full md:hidden"
          control={control}
          label="Buscar"
          name="query"
          placeholder={placeholder || 'Buscar por nombre, apellido, o DNI'}
        />
        <Button
          className="input-bordered p-3 hover:border-gray-500 md:hidden"
          type="submit"
        >
          <Icon iconComponent={<IoSearch />} size="23px" title="buscar" />
        </Button>
      </div>
      <Grid container className="md:hidden" gap={2}>
        <Grid item xs={12}>
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
          placeholder={placeholder || 'Buscar por nombre, apellido, o DNI'}
        />
        <Button
          className="input-bordered p-3 hover:border-gray-500"
          type="submit"
        >
          <Icon iconComponent={<IoSearch />} size="23px" title="buscar" />
        </Button>
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
