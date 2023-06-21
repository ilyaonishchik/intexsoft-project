import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPage, setTake } from '../../redux/slices/searchSlice';
import { Pagination as CommonPagination } from '../common';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { count, page, take } = useAppSelector(state => state.search);

  return (
    <CommonPagination
      total={Math.ceil(count / Number(take))}
      page={page}
      onPageChange={value => dispatch(setPage(value))}
      takeData={['4', '8', '12']}
      take={take}
      onTakeChange={value => dispatch(setTake(Number(value)))}
    />
  );
}
