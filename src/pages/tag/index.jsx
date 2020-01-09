import React, { useEffect, useRef, useState } from 'react';
import { Divider, Input, Popconfirm, Table } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import './index.less';
import { queryAll as queryTagAll, update, deleteById } from '@/services/tag';

export default props => {
  const [tagList, setTagList] = useState([]);
  const [trogle, setTrogle] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSize: 10, pageNum: 1 });
  const formRef = useRef(null);

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
  }, []);

  function queryTagAllData() {
    queryTagAll().then(data => data && data.data && setTagList(data.data.list));
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

  return (
    <div>
      <HeaderForm handleSearch={handleSearch} hanldeAdd={hanldeAdd} items={header} />
      <Table columns={columns} dataSource={tagList} onChange={onChange} />
      <ColumnForm ref={formRef} trogle={trogle} handleSubmit={handleSubmit} items={items} />
    </div>
  );
};
