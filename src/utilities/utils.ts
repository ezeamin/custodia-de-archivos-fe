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
