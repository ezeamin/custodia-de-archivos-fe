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
      url: `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${stateNumber}&campos=id,nombre&max=250`,
      omitBaseUrl: true,
    }),
    GET_STREETS: ({
      state,
      locality,
    }: {
      state: string;
      locality: string;
    }): ApiRoute => ({
      method: 'GET',
      url: `https://apis.datos.gob.ar/georef/api/calles?provincia=${state}&departamento=${locality}&campos=id,nombre&max=5000`,
      omitBaseUrl: true,
    }),
  },
};
