import packageJson from '../../../package.json';

import { useSession } from '@/stores/useSession';

import RoutingCard from '@/components/Common/RoutingCard';
import Title from '@/components/Common/Title';
import { Grid } from '@/components/ui';

import { paths } from '@/constants/routes/paths';
import { userRoles } from '@/constants/userRoles/userRoles';

const routes = {
  GENERAL: [
    {
      id: 1,
      path: paths.SETTINGS.CHANGE_PASSWORD,
      name: 'Cambiar contraseña de este perfil',
      allowedRoles: [
        userRoles.ADMIN,
        userRoles.THIRD_PARTY,
        userRoles.EMPLOYEE,
        userRoles.AREA,
      ],
    },
    {
      id: 2,
      path: paths.SETTINGS.LOGIN_LOGS,
      name: 'Ver registros de inicios de sesión',
      allowedRoles: [userRoles.ADMIN, userRoles.THIRD_PARTY],
    },
  ],
  ADMIN: [
    {
      id: 1,
      path: paths.SETTINGS.MAKE_ADMIN,
      name: 'Hacer administrador a otro usuario',
    },
    {
      id: 2,
      path: paths.SETTINGS.REMOVE_ADMIN,
      name: 'Quitar permisos de administrador a otro usuario',
    },
  ],
  READ_ONLY: [
    {
      id: 1,
      path: paths.SETTINGS.MAKE_READ_ONLY,
      name: 'Crear usuario de solo lectura',
    },
    {
      id: 2,
      path: paths.SETTINGS.REMOVE_READ_ONLY,
      name: 'Eliminar usuario de solo lectura',
    },
  ],
};

const appVersion = packageJson.version;

const SettingsView = () => {
  const { user } = useSession();

  return (
    <section className="overflow-hidden pb-0.5 pr-0.5">
      <Title title="Ajustes" />
      <article className="relative z-10">
        <h3 className="animate-in-bottom a-delay-100 mb-2 text-xl font-bold">
          General
        </h3>
        <Grid container gap={3}>
          {routes.GENERAL.map((route, index) => (
            <Grid item key={route.id} sm={6} xl={4} xs={12}>
              <RoutingCard index={index} route={route} />
            </Grid>
          ))}
        </Grid>
        {user?.role === userRoles.ADMIN && (
          <>
            <h3 className="animate-in-bottom a-delay-500 mb-2 mt-6 text-xl font-bold">
              Usuarios Administradores
            </h3>
            <Grid container gap={3}>
              {routes.ADMIN.map((route, index) => (
                <Grid item key={route.id} sm={6} xl={4} xs={12}>
                  <RoutingCard index={index + 3} route={route} />
                </Grid>
              ))}
            </Grid>
            <h3 className="animate-in-bottom a-delay-800 mb-2 mt-6 text-xl font-bold">
              Usuarios Solo Lectura
            </h3>
            <Grid container gap={3}>
              {routes.READ_ONLY.map((route, index) => (
                <Grid item key={route.id} sm={6} xl={4} xs={12}>
                  <RoutingCard index={index + 6} route={route} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </article>
      <p className="animate-in-top mt-5 text-center md:fixed md:bottom-2 md:right-2 md:mt-0">
        Versión: {appVersion}
      </p>
    </section>
  );
};
export default SettingsView;
