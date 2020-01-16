import { queryAll, queryById, update } from '@/services/tag';
import { createContainer } from 'unstated-next';
import usePage from '@/utils/hooks/usePage';
import useQuery from '@/utils/hooks/useQuery';

export function useData() {
  const { data, query, setParam: setQueryParam } = useQuery({}, {}, queryById);
  const { list, fetch, param, setParam, pagination } = usePage([], {}, queryAll);
  function handlePageChange(e) {
    param.pageNum = e.current;
    setParam({ ...param });
  }
  function handleSearch(values) {
    setParam({ ...param, ...values });
  }
  function handleSubmit(value) {
    update(value).then(() => {
      fetch();
    });
  }
  return {
    list,
    fetch,
    pagination,
    setParam,
    handlePageChange,
    handleSearch,
    handleSubmit,
  };
}

export default createContainer(useData);
