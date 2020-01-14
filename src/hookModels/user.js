import { deleteById } from '@/services/user';
import { createContainer } from 'unstated-next';
import useQuery from '@/utils/hooks/useQuery';
import { queryAll, queryById } from '@/services/book';
import usePage from '@/utils/hooks/usePage';

export function useData() {
  const { data, query } = useQuery({}, {}, queryById);
  const { list, fetch, param, setParam } = usePage([], {}, queryAll);

  function deleteData(id) {
    deleteById(id).then(() => fetch());
  }

  function changePage(e) {
    param.pageNum = e.current;
    setParam({ ...param });
  }

  return {
    list,
    param,
    data,
    fetch,
    query,
    deleteData,
    changePage,
  };
}

export default createContainer(useData);
