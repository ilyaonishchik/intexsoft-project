import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPage, setTake } from '../../redux/slices/catalogSlice';
import { Pagination as CommonPagination } from '../common';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { count, page, take } = useAppSelector(state => state.catalog);

  return (
    <CommonPagination
      total={Math.ceil(count / Number(take))}
      page={page}
      onPageChange={value => dispatch(setPage(value))}
      takeData={['3', '6', '9']}
      take={take}
      onTakeChange={value => dispatch(setTake(Number(value)))}
    />
  );
}
