import React, { useEffect, useRef, useState } from 'react';
import { DatePicker, Divider, Icon, Input, Popconfirm, Switch, Table } from 'antd';
import Link from 'umi/link';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import QiniuUpload from '@/components/qiniu/upload';
import TagSelect from './TagSelect';
import './index.less';
import { queryAll, update, deleteById } from '@/services/book';
import { queryAll as queryTagAll } from '@/services/tag';
import moment from 'moment';

export default props => {
  const [list, setList] = useState([]);
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
      title: '描述',
      dataIndex: 'detail',
    },
    {
      title: '发布时间',
      dataIndex: 'publish',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: 'vip',
      dataIndex: 'vip',
      render: (text, record) => (
        <Switch checked={text} onChange={() => switchOnChange('vip', record)} />
      ),
    },
    {
      title: '推荐',
      dataIndex: 'top',
      render: (text, record) => (
        <Switch checked={text} onChange={() => switchOnChange('top', record)} />
      ),
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
          <Link to={`/book/${text}`}>详情</Link>
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
    {
      label: '描述',
      id: 'detail',
      options: {
        rules: [
          {
            required: true,
          },
        ],
      },
      render: <Input placeholder="描述" />,
    },
    {
      label: '标签',
      id: 'bookTags',
      options: {
        rules: [
          {
            required: true,
          },
        ],
      },
      render: <TagSelect max={4} tags={tagList} />,
    },
    {
      label: '发布时间',
      id: 'publishTime',
      options: {
        rules: [
          {
            required: true,
          },
        ],
      },
      render: (
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        />
      ),
    },
    {
      label: 'logo图片',
      id: 'image',
      options: {
        rules: [
          {
            required: true,
          },
        ],
      },
      render: <QiniuUpload single />,
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
    queryAllData();
  }, [queryParam]);

  useEffect(() => {
    queryTagAll();
    queryTagAllData();
  }, []);

  function queryAllData() {
    queryAll(queryParam).then(data => data && data.data && setList(data.data.list));
  }

  function queryTagAllData() {
    queryTagAll().then(data => data && data.data && setTagList(data.data.list));
  }

  function onChange(e) {
    queryParam.pageNum = e.current;
    setQueryParam({ ...queryParam });
  }

  function modify(record) {
    formRef.current.setFieldsValue(record);
    setTrogle(!trogle);
  }

  function deleteData(id) {
    deleteById(id).then(() => queryAllData());
  }

  function handleSearch(values) {
    setQueryParam({ ...queryParam, ...values });
  }

  function hanldeAdd() {
    formRef.current.resetFields();
    setTrogle(!trogle);
  }

  function handleSubmit(value) {
    update(value).then(data => {
      queryAllData();
    });
  }

  function switchOnChange(key, data) {
    data[key] = !data[key];
    setList([...list]);
  }

  return (
    <div>
      <HeaderForm handleSearch={handleSearch} hanldeAdd={hanldeAdd} items={header}></HeaderForm>
      <Table columns={columns} dataSource={list} onChange={onChange} />
      <ColumnForm ref={formRef} trogle={trogle} handleSubmit={handleSubmit} items={items} />
    </div>
  );
};
