import { queryAll, queryById } from '@/services/book';
import { createContainer } from 'unstated-next';
import useQuery from '@/utils/hooks/useQuery';
import usePage from '@/utils/hooks/usePage';

export function useData() {
  const { data, query, setParam: setDataParam } = useQuery({}, {}, queryById);
  // 编辑中
  const { list: listEditor, fetch: fetchEditorList, pagination: editorPagination } = usePage(
    [],
    { status: 1 },
    queryAll,
  );
  // 未发布新书
  const { list, fetch } = usePage([], { status: 0 }, queryAll);
  // 已完结
  const { list: ownlist, fetch: fetchOwnList, pagination: ownPagination } = usePage(
    [],
    { status: 2 },
    queryAll,
  );

  return {
    ownlist,
    list,
    listEditor,
    fetchOwnList,
    data,
    fetch,
    query,
    fetchEditorList,
    setDataParam,
    editorPagination,
    ownPagination,
  };
}

export default createContainer(useData);
