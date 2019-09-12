import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Divider, Popconfirm, Table } from 'antd';
import HeaderForm from '@/components/LableForm/index'
import './index.less'
import { deleteById, list as queryAll } from '@/services/user'

export default props => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSise: 10, pageNum: 1 });
  const formRef = useRef(null);
  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'name',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: text => (
        <Avatar src={text} />
      ),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => (
        <span>
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

  useEffect(() => {
    queryAllData();
  }, [queryParam])

  function queryAllData() {
    queryAll(queryParam).then(data => data && data.data && setList(data.data.list))
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
  }

  return (<div>
    <HeaderForm handleSearch={handleSearch}/>
    <Table columns={columns} dataSource={list} onChange={onChange}/>
  </div>)
}
