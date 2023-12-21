'use client';

import { useState } from 'react';

import Pagination from './Pagination';

const PaginationExample = (): JSX.Element => {
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(0);

  const changePage1 = (_e: React.SyntheticEvent, newPage: number): void => {
    setPage1(newPage);
  };
  const changePage2 = (_e: React.SyntheticEvent, newPage: number): void => {
    setPage2(newPage);
  };

  return (
    <>
      <div className="md:w-6/12 w-full">
        Width 50%
        <p>{page1}</p>
        <Pagination onPageChange={changePage1} totalElements={150} />
      </div>
      <div className="w-full">
        Width 100%
        <p>{page2}</p>
        <Pagination onPageChange={changePage2} totalElements={150} />
      </div>
    </>
  );
};

export default PaginationExample;
