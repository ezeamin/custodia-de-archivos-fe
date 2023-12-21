export const apiRoutes = {
  RESOLUTIONS: ({ params }: { params: string }) => ({
    method: 'GET',
    url: `/agreements${params}`,
  }),
  RESOLUTION_BY_ID: ({ id = '' }: { id: string }) => ({
    method: 'GET',
    url: `/agreements/${id}`,
  }),
  RESOLUTION_TYPES: {
    method: 'GET',
    url: '/agreements/agreements-type',
  },
  RESOLUTION_FILE_BY_ID: ({ id = '' }: { id: string }) => ({
    method: 'GET',
    url: `/agreements/attach/${id}`,
  }),
};
