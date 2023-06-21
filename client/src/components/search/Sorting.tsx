import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setOrder, setSortBy } from '../../redux/slices/searchSlice';
import { Sorting as CommonSorting } from '../common';

export default function Sorting() {
  const dispatch = useAppDispatch();
  const { sortBy, order } = useAppSelector(state => state.search);

  return (
    <CommonSorting
      sortBy={sortBy}
      onSortByChange={value => dispatch(setSortBy(value!))}
      order={order}
      onOrderChange={value => dispatch(setOrder(value!))}
    />
  );
}
