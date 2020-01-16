import { queryAllBook, queryById, update, deleteById } from '@/services/book';
import { createContainer } from 'unstated-next';
import useQuery from '@/utils/hooks/useQuery';
import usePage from '@/utils/hooks/usePage';
import React from 'react';

export function useData() {
  const { data, query, setParam: setQueryParam } = useQuery({}, {}, queryById);
  // 全部书籍
  const { list, set, fetch, param, setParam, pagination } = usePage([], {}, queryAllBook);
  // 分页
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
  function handleDelete(id) {
    deleteById(id).then(() => {
      fetch();
    });
  }
  function switchOnChange(key, raw) {
    raw[key] ? (raw[key] = 0) : (raw[key] = 1);
    set([...list]);
    update(raw);
  }
  return {
    list,
    fetch,
    pagination,
    setParam,
    handlePageChange,
    handleSearch,
    handleSubmit,
    handleDelete,
    switchOnChange,
  };
}

export default createContainer(useData);
