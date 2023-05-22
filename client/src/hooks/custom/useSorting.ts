import { useState } from 'react';

export const useSorting = (initialSortBy: string, initialOrder = 'asc') => {
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [order, setOrder] = useState<string>(initialOrder);

  return { sortBy, setSortBy, order, setOrder };
};
