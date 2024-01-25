import { useLocation } from 'react-router-dom';

import { Alert, Button } from '../ui';
import { useQueryClient } from '@tanstack/react-query';

import { EmptyAlertProps } from '../interface';

const EmptyAlert = (props: EmptyAlertProps) => {
  const { queryKey } = props;

  const location = useLocation();
  const queryClient = useQueryClient();

  const handleClear = () => {
    const { search } = location;

    const params = new URLSearchParams(search);
    const hasSearched = params.has('query');

    params.delete('query');
    params.set('page', '0');
    params.set('entries', '10');

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );

    if (hasSearched)
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
  };

  return (
    <Alert className="mb-3" type="warning">
      <p>
        No se encontraron resultados para la búsqueda realizada. Intente con
        otros valores.
      </p>
      <Button className="mt-2" onClick={handleClear}>
        Limpiar filtros
      </Button>
    </Alert>
  );
};
export default EmptyAlert;
