import React, { useEffect, useRef, useState } from 'react';
import { Divider, Icon, Input, Popconfirm, Switch, Table } from 'antd';
import Link from 'umi/link';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import QiniuUpload from '@/components/qiniu/upload';
import TagSelect from './TagSelect';
import './index.less';
import moment from 'moment';
import BookContainer from '@/hookModels/admin/book';
import TagContainer from '@/hookModels/admin/tag';
import DatePicker from '@/pages/book/DatePicker';

export default props => {
  const { list: tagList, fetch: tagFetch } = TagContainer.useContainer();
  const [trogle, setTrogle] = useState(false);
  const formRef = useRef(null);
  const {
    list,
    fetch,
    handlePageChange,
    handleSearch,
    handleSubmit,
    pagination,
    handleDelete,
    switchOnChange,
  } = BookContainer.useContainer();
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
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
        <Switch checked={!!text} onChange={() => switchOnChange('vip', record)} />
      ),
    },
    {
      title: '推荐',
      dataIndex: 'top',
      render: (text, record) => (
        <Switch checked={!!text} onChange={() => switchOnChange('top', record)} />
      ),
    },
    {
      title: '签约',
      dataIndex: 'contractStatus',
      render: (text, record) => (
        <Switch checked={!!text} onChange={() => switchOnChange('contractStatus', record)} />
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
            onConfirm={() => handleDelete(record.id)}
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
      id: 'publish',
      render: (
        <DatePicker
          format="yyyy-MM-DD HH:mm:ss"
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
    fetch();
    tagFetch();
  }, []);

  function modify(record) {
    formRef.current.setFieldsValue(record);
    setTrogle(!trogle);
  }

  function hanldeAdd() {
    formRef.current.resetFields();
    setTrogle(!trogle);
  }

  function onSubmit(values) {
    handleSubmit(values);
    setTrogle(!trogle);
  }

  return (
    <div>
      <HeaderForm handleSearch={handleSearch} hanldeAdd={hanldeAdd} items={header}></HeaderForm>
      <Table
        columns={columns}
        dataSource={list}
        onChange={handlePageChange}
        pagination={pagination}
      />
      <ColumnForm ref={formRef} trogle={trogle} handleSubmit={onSubmit} items={items} />
    </div>
  );
};
