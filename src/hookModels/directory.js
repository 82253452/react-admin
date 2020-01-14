import { deleteById, queryAll, queryById } from '@/services/directory';
import { createContainer } from 'unstated-next';
import usePage from '@/utils/hooks/usePage';
import useQuery from '@/utils/hooks/useQuery';

export function useData() {
  const { list, param, setParam, fetch, reload, loading } = usePage([], {}, queryAll);
  const { data, setData, query } = useQuery({}, {}, queryById);

  function addDirectory() {
    list.push({
      name: '',
      index: 1,
      editable: true,
    });
  }

  function modify(record) {
    record.editable = !record.editable;
    reload();
  }

  function modifyName(record, e) {
    record.name = e.target.value;
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
    setData(record);
  }

  return {
    list,
    data,
    param,
    fetch,
    query,
    addDirectory,
    deleteData,
    modify,
    changePage,
    modifyName,
    modifyData,
  };
}

export default createContainer(useData);
