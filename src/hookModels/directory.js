import { deleteById, queryAll, queryById, update, save } from '@/services/directory';
import { createContainer } from 'unstated-next';
import usePage from '@/utils/hooks/usePage';
import useQuery from '@/utils/hooks/useQuery';

export function useData() {
  const {
    list,
    param,
    setParam,
    fetch,
    reload,
    loading,
    pagination,
    setPagination,
    push,
  } = usePage([], {}, queryAll);
  const { data, query, loading: queryLoading } = useQuery({}, {}, queryById);

  function addDirectory(p) {
    save(p);
    setParam({ ...param, pageNum: 1 });
  }

  function modify(record) {
    record.editable = !record.editable;
    reload();
  }

  function modifyName(record, e) {
    record.name = e.target.value;
    update(record);
    reload();
  }

  function deleteData(id) {
    deleteById(id).then(() => fetch());
  }

  function changePage(e) {
    param.pageNum = e.current;
    setParam({ ...param });
  }

  function modifyData(record) {
    query(record.id);
  }

  function updateContent(content) {
    update({ ...data, content });
  }

  return {
    list,
    data,
    param,
    fetch,
    query,
    queryLoading,
    pagination,
    loading,
    addDirectory,
    deleteData,
    modify,
    changePage,
    modifyName,
    modifyData,
    updateContent,
  };
}

export default createContainer(useData);
