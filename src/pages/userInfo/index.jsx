import React, { useEffect, useRef, useState } from 'react';
import { Divider, Input, Popconfirm, Switch, Table, Tag } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import './index.less';
import { queryAll, update, deleteById } from '@/services/userInfo';

export default props => {
  const [list, setList] = useState([]);
  const [trogle, setTrogle] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSize: 10, pageNum: 1 });
  const formRef = useRef(null);

  const columns = [
    {
      title: '名称',
      dataIndex: 'nickname',
    },
    {
      title: '等级',
      dataIndex: 'grade',
      render: text => <Tag color="red">{text ? `${text}级` : '无'}</Tag>,
    },
    {
      title: '签约',
      dataIndex: 'contractStatus',
      render: (text, record) => (
        <Switch checked={text} onChange={() => switchOnChange('contractStatus', record)} />
      ),
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => (
        <span>
          <a onClick={() => modify(record)}>修改</a>
          <Divider type="vertical" />
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
      render: <Input hidden />,
    },
    {
      label: '名称',
      id: 'name',
      options: {
        rules: [
          {
            required: true,
          },
        ],
      },
      render: <Input placeholder="名称" />,
    },
  ];
  const header = [
    {
      label: '名称',
      id: 'name',
      render: <Input placeholder="描述" />,
    },
  ];

  useEffect(() => {
    queryTagAllData();
  }, [queryParam]);

  function queryTagAllData() {
    queryAll().then(data => data && data.data && setList(data.data.list));
  }

  function onChange(e) {
    queryParam.pageNum = e.current;
    setQueryParam({ ...queryParam });
  }

  function modify(record) {
    formRef.current.setFieldsValue(record);
  }

  function deleteData(id) {
    deleteById(id).then(() => queryTagAllData());
  }

  function handleSearch(values) {
    setQueryParam({ ...queryParam, ...values });
  }

  function hanldeAdd() {
    formRef.current.resetFields();
    setTrogle(!trogle);
  }

  function handleSubmit(value) {
    setTrogle(!trogle);
    update(value).then(() => {
      queryTagAllData();
    });
  }

  function switchOnChange(key, data) {
    data[key] = !data[key];
    setList([...list]);
  }

  return (
    <div>
      <HeaderForm handleSearch={handleSearch} items={header} />
      <Table columns={columns} dataSource={list} onChange={onChange} />
      <ColumnForm ref={formRef} trogle={trogle} handleSubmit={handleSubmit} items={items} />
    </div>
  );
};
