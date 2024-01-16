import { ApiRoute } from '../interface/routes';

export const apiExternalRoutes = {
  LOCATION: {
    GET_STATES: (): ApiRoute => ({
      method: 'GET',
      url: 'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre',
      omitBaseUrl: true,
    }),
    GET_LOCALITIES: ({ stateNumber }: { stateNumber: string }): ApiRoute => ({
      method: 'GET',
      url: `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${stateNumber}&campos=id,nombre&max=150`,
      omitBaseUrl: true,
    }),
  },
};
