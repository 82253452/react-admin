import { queryAll, queryById } from '@/services/book';
import { createContainer } from 'unstated-next';
import useQuery from '@/utils/hooks/useQuery';
import usePage from '@/utils/hooks/usePage';

export function useData() {
  const { data, query, setParam: setDataParam } = useQuery({}, {}, queryById);
  const { list, fetch } = usePage([], {}, queryAll);
  const { list: ownlist, fetch: fetchOwnList, loading: ownLoading } = usePage([], {}, queryAll);

  return { ownlist, list, data, fetch, query, fetchOwnList, setDataParam, ownLoading };
}

export default createContainer(useData);
