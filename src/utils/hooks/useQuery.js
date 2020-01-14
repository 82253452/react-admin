import { useState } from 'react';
import { useMap, useToggle, useUpdateEffect } from 'react-use';

export default function(init, paramData, api) {
  const [data, setData] = useState(init || {});
  const [param, { set: setParam }] = useMap(paramData || {});
  const [loading, setLoading] = useState(true);

  useUpdateEffect(() => {
    query();
  }, [param]);

  async function query(p) {
    setLoading(true);
    await api(p).then(res => setData(res.data));
    setLoading(false);
  }

  return { data, param, query, setData, setParam, loading, setLoading };
}
