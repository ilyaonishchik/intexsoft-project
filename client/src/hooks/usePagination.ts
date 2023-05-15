import { useState } from 'react';

export const usePagination = (initialPage = 1, initialTake = 5) => {
  const [page, setPage] = useState<number>(initialPage);
  const [take, setTake] = useState<number>(initialTake);

  return { page, setPage, take, setTake };
};
