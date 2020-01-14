import { useState } from 'react';
import { useList, useUpdateEffect } from 'react-use';

export default function(init, paramInit, api) {
  const [list, { set, push }] = useList(init || []);
  const [loading, setLoading] = useState(true);
  const [param, setParam] = useState({ ...paramInit, pageSize: 10, pageNum: 1 });
  const [pagination, setPagination] = useState({ pageSize: 10 });
  const [hasMore, setHasmore] = useState(true);

  useUpdateEffect(() => {
    setLoading(false);
  }, [list]);
  useUpdateEffect(() => {
    fetch();
  }, [param]);

  async function fetch() {
    setLoading(true);
    await api(param).then(res => {
      const { list: dataList, pageNum, total, hasNextPage } = res.data;
      // param.pageNum === 1 ? set(dataList) : push(dataList);
      set(dataList);
      setPagination({ ...pagination, current: pageNum, total });
      setHasmore(hasNextPage);
    });
  }

  function reload() {
    set(list);
  }

  return {
    list,
    param,
    fetch,
    setParam,
    set,
    push,
    reload,
    loading,
    pagination,
    hasMore,
    setPagination,
  };
}
