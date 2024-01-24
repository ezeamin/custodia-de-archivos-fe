import { Route } from '@/constants/interface';

/**
 * Usage with template literals. To call the function, do not use parentheses.
 * @param strings -
 * @param values -
 * @returns string
 */
export const removeLineBreaks = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  let result = '';

  for (let i = 0; i < strings.length; i += 1) {
    result += strings[i];
    if (i < values.length) {
      result += String(values[i]);
    }
  }

  // Remove line breaks and extra spaces
  result = result.replace(/\s+/g, ' ');

  return result;
};

export const flattenRoutes = (routes: Route[]): Route[] => {
  let flattenedRoutes: Route[] = [];

  routes.forEach((route) => {
    flattenedRoutes.push(route);

    if (route.subpaths && route.subpaths.length > 0) {
      const subpaths = flattenRoutes(route.subpaths);
      flattenedRoutes = flattenedRoutes.concat(subpaths);
    }
  });

  return flattenedRoutes;
};

export const generateRandomId = () => window.self.crypto.randomUUID();

export const changeMeta = (theme: string) => {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#ffffff' : '#325d85');
};

export const openFile = (url: string, name: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const cleanUpDataToSend = (
  data: Record<string, unknown> | FormData,
  removeFieldName?: string
): Record<string, unknown> | FormData => {
  // Check if body is FormData Type
  if (data instanceof FormData) {
    // do the same but for formData type

    // remove id field, if present
    const id = data.get('id');
    if (id) {
      data.delete('id');
    }

    // if there are any object of type {id: string, description: string} in the data, remove the field and create a new one with the same name + "Id", with only the id
    const entries = data.entries();
    const newData = new FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of entries) {
      newData.append(key, value);
      if (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        typeof value.id === 'string'
      ) {
        newData.append(`${key}Id`, value.id);
        newData.delete(key);
      }
    }

    if (removeFieldName) {
      newData.delete(removeFieldName);
    }

    return newData;
  }

  // remove id field, if present
  const { id, ...rest } = data;

  // if there are any object of type {id: string, description: string} in the data, remove the field and create a new one with the same name + "Id", with only the id
  let newData = Object.entries(rest).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(typeof value === 'object' && value !== null && 'id' in value
        ? {
            [`${key}Id`]: value.id,
          }
        : { [key]: value }),
    }),
    {}
  );

  if (removeFieldName) {
    const { [removeFieldName as keyof typeof newData]: _, ...restData } =
      newData;
    newData = restData;
  }

  return newData;
};

export const decodePayload = (token: string) => {
  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload));

  return decodedPayload;
};

export const displayStatusLabel = (status: string) => {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'inactive':
      return 'Inactivo';
    case 'suspended':
      return 'Suspendido';
    case 'deleted':
      return 'Eliminado';
    default:
      return 'Sin estado';
  }
};

export const displayLabelRole = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador';
    case 'EMPLOYEE':
      return 'Empleado';
    case 'READ_ONLY':
      return 'Solo lectura';
    default:
      return 'Sin rol';
  }
};
