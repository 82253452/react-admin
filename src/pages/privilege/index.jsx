import React, { useEffect, useState, useRef } from 'react';
import { Col, Divider, Form, Input, Popconfirm, Table, Select } from 'antd';
import HeaderForm from '@/components/LableForm/index'
import ColumnForm from '@/components/ColumnForm/index'
import './index.less'

import { queryAll } from '@/services/privilege'

export default props => {
  const [img, setImg] = useState({});
  useEffect(() => {
    queryAll().then(data => setImg(data.data))
  }, [])
  return (<div>
    {Object.keys(img).map(k => <img alt="" src={img[k]}/>)}
  </div>)
}
