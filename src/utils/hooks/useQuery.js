import { useState } from 'react';
import { useMap, useToggle, useUpdateEffect } from 'react-use';

export default function(init, paramData, api) {
  const [data, setData] = useState(init || {});
  const [param, { set: setParam }] = useMap(paramData || {});
  const [loading, setLoading] = useState(true);

  useUpdateEffect(() => {
    setLoading(false);
  }, [data]);

  useUpdateEffect(() => {
    query();
  }, [param]);

  async function query(p) {
    loading || setLoading(true);
    await api(p || param).then(res => setData(res.data));
  }

  return { data, param, query, setData, setParam, loading, setLoading };
}
