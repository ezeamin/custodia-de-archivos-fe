'use client';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { defaultOption } from '@/constants/defaultOption';
import { routes } from '@/constants/routes';

import type { Route, RouteOption } from '@/constants/interface';

const findDeepestSubpathOptions = (
  path: string,
  currentModule: Route
): RouteOption[] => {
  const matchingSubpath = currentModule.subpaths?.find((subpath) =>
    path.includes(subpath.path)
  );

  if (matchingSubpath) {
    return findDeepestSubpathOptions(path, matchingSubpath);
  }

  return currentModule.options;
};

const useOptions = (): RouteOption[] => {
  const [options, setOptions] = useState<RouteOption[]>([]);

  const { pathname } = useLocation();

  useEffect(() => {
    const currentModule = routes.find((route) => pathname.includes(route.path));

    if (!currentModule) {
      throw new Error('Route not found');
    }

    const subpathOptions = findDeepestSubpathOptions(pathname, currentModule);

    const list = [defaultOption, ...subpathOptions];

    if (!subpathOptions.length) {
      list.push(...currentModule.options);
    }

    setOptions(list);
  }, [pathname]);

  return options;
};
export default useOptions;
