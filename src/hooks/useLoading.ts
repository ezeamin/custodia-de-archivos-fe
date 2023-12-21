// import { useEffect } from 'react';

// import { useAppDispatch } from '@/app/hook';

// import { setLoadingBackdropOpened } from '@/features/loading';

// export const useLoading = (isLoading = false, isUninitialized = true) => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (isLoading) dispatch(setLoadingBackdropOpened(true));

//     if (!isUninitialized && !isLoading)
//       dispatch(setLoadingBackdropOpened(false));
//   }, [
//     isLoading,
//     isUninitialized,
//     dispatch,
//   ]);
// };

export const useLoading = (): object => {
  return {};
};
