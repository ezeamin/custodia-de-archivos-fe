import packageJson from '../../../package.json';

import RoutingCard from '@/components/Common/RoutingCard';
import Title from '@/components/Common/Title';
import { Alert, Grid } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

const routes = {
  GENERAL: [
    {
      id: 1,
      path: paths.SETTINGS.CHANGE_PASSWORD,
      name: 'Cambiar contraseña de este perfil',
      disabled: true,
    },
    {
      id: 2,
      path: paths.SETTINGS.LOGIN_LOGS,
      name: 'Ver registros de inicios de sesión',
      disabled: true,
    },
  ],
  ADMIN: [
    {
      id: 1,
      path: paths.SETTINGS.MAKE_ADMIN,
      name: 'Hacer administrador a otro usuario',
      disabled: true,
    },
    {
      id: 2,
      path: paths.SETTINGS.REMOVE_ADMIN,
      name: 'Quitar permisos de administrador a otro usuario',
      disabled: true,
    },
  ],
  READ_ONLY: [
    {
      id: 1,
      path: paths.SETTINGS.MAKE_READ_ONLY,
      name: 'Crear usuario de solo lectura',
      disabled: true,
    },
    {
      id: 2,
      path: paths.SETTINGS.REMOVE_READ_ONLY,
      name: 'Eliminar usuario de solo lectura',
      disabled: true,
    },
  ],
};

const isThereAnyDisabledRoute = () => {
  const routesArray = Object.values(routes);
  return routesArray.some((higherOrderRoute) =>
    higherOrderRoute.some((element) => element.disabled)
  );
};

const appVersion = packageJson.version;

const SettingsView = () => {
  return (
    <section className="overflow-hidden pr-0.5 pb-0.5">
      <Title title="Ajustes" />
      {isThereAnyDisabledRoute() && (
        <Alert className="mb-5 animate-in-right" type="warning">
          ¡Lo sentimos! Algunas de nuestras funcionalidades no están aún
          disponibles.
        </Alert>
      )}
      <article className="relative z-10">
        <h3 className="font-bold text-xl mb-2 animate-in-bottom a-delay-100">
          General
        </h3>
        <Grid container gap={3}>
          {routes.GENERAL.map((route, index) => (
            <Grid item key={route.id} sm={6} xl={4} xs={12}>
              <RoutingCard index={index} route={route} />
            </Grid>
          ))}
        </Grid>
        <h3 className="font-bold text-xl mb-2 mt-6 animate-in-bottom a-delay-500">
          Usuarios Administradores
        </h3>
        <Grid container gap={3}>
          {routes.ADMIN.map((route, index) => (
            <Grid item key={route.id} sm={6} xl={4} xs={12}>
              <RoutingCard index={index + 3} route={route} />
            </Grid>
          ))}
        </Grid>
        <h3 className="font-bold text-xl mb-2 mt-6 animate-in-bottom a-delay-800">
          Usuarios Solo Lectura
        </h3>
        <Grid container gap={3}>
          {routes.READ_ONLY.map((route, index) => (
            <Grid item key={route.id} sm={6} xl={4} xs={12}>
              <RoutingCard index={index + 6} route={route} />
            </Grid>
          ))}
        </Grid>
      </article>
      <p className="mt-5 text-center md:mt-0 md:fixed md:bottom-2 md:right-2 animate-in-top">
        Versión: {appVersion}
      </p>
    </section>
  );
};
export default SettingsView;
