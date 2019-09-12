import React, { useEffect, useState, useRef } from 'react';
import { Col, Divider, Form, Input, Popconfirm, Table, Select } from 'antd';
import HeaderForm from '@/components/LableForm/index'
import ColumnForm from '@/components/ColumnForm/index'
import './index.less'
import { deleteById, queryAll, saveOrUpdate } from '@/services/address'

export default props => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSise: 10, pageNum: 1 });
  const formRef = useRef(null);
  const { Option } = Select;
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => (
        <span>
        <a onClick={() => modify(record)}>修改</a>
        <Divider type="vertical"/>
          <Popconfirm
            title="确定删除数据?"
            onConfirm={() => deleteData(record.id)}
            okText="确定"
            cancelText="取消"
          >
          <a href="#">删除</a>
        </Popconfirm>
      </span>
      ),
    },
  ];
  const items = [
    {
      id: 'id',
      render: <Input hidden/>,
    },
    {
      label: '父级',
      id: 'pid',
      options: {},
      render: <Select style={{ width: 120 }}>
       {
         list.map(option => <Option value={option.id}>{option.name}</Option>)
       }
      </Select>,
    },
    {
      label: '名称',
      id: 'name',
      options: {},
      render: <Input placeholder="名称"/>,
    },
  ]
  useEffect(() => {
    queryAllData();
  }, [queryParam])

  function queryAllData() {
    queryAll(queryParam).then(data => data && data.data && setList(data.data))
  }

  function onChange(e) {
    queryParam.pageNum = e.current;
    setQueryParam({ ...queryParam })
  }

  function modify(record) {
    setVisible(true)
    formRef.current.setFieldsValue(record)
  }

  function deleteData(id) {
    deleteById(id).then(() => queryAllData())
  }

  function handleSearch(values) {
    setQueryParam({ ...queryParam, ...values });
  }

  function hanldeAdd() {
    formRef.current.resetFields()
    setVisible(true)
  }

  function handleSubmit(value) {
    setVisible(false)
    value.pid ? value.type = 2 : value.type = 1;
    saveOrUpdate(value).then(() => queryAllData())
  }

  return (<div>
    <HeaderForm handleSearch={handleSearch} hanldeAdd={hanldeAdd}/>
    <Table columns={columns} dataSource={list} onChange={onChange}/>
    <ColumnForm ref={formRef} visible={visible} handleSubmit={handleSubmit} items={items}
                handleCancel={() => setVisible(false)}></ColumnForm>
  </div>)
}
