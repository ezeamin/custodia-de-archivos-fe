import RoutingCard from '@/components/Common/RoutingCard';
import Title from '@/components/Common/Title';
import { Grid } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

const routes = [
  {
    id: 1,
    path: paths.TYPES_LIST.NOTIFICATIONS,
    name: 'Notificaciones',
  },
  {
    id: 2,
    path: paths.TYPES_LIST.LICENSES,
    name: 'Licencias',
  },
  {
    id: 3,
    path: paths.TYPES_LIST.TRAININGS,
    name: 'Capacitaciones',
  },
];

const TypesListView = () => {
  return (
    <>
      <Title title="Tipos de Listado" />
      <Grid container gap={3}>
        {routes.map((route, index) => (
          <Grid item key={route.id} sm={6} xl={4} xs={12}>
            <RoutingCard showType index={index} route={route} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default TypesListView;
