import React, { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, Input, Popconfirm, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import './index.less';
import { deleteById, queryById } from '@/services/book';
import { queryAll } from '@/services/directory';
import Link from 'umi/link';
import ContentEditor from '@/pages/book/ContentEditor';

export default ({ match }) => {
  const [data, setData] = useState({});
  const [editorRecord, setEditorRecord] = useState({});
  const [list, setList] = useState([]);
  const [trogle, setTrogle] = useState(false);
  const [queryParam, setQueryParam] = useState({
    pageSize: 10,
    pageNum: 1,
    bookId: match.params.id,
  });
  const columns = [
    {
      title: '章节',
      dataIndex: 'index',
      key: 'index',
      render: text => <span>第{text}章</span>,
    },
    {
      title: '简介',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => {
                record.name = e.target.value;
                setList([...list]);
              }}
              onBlur={() => handleBlur(record)}
              placeholder="简介"
            />
          );
        }
        return text;
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => (
        <span>
          <a
            onClick={() => {
              setEditorRecord(record);
              setTrogle(!trogle);
            }}
          >
            内容
          </a>
          <Divider type="vertical" />
          <a onClick={() => modify(record)}>{record.editable ? '保存' : '修改'}</a>
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

  function modifyContent() {}

  function modify(record) {
    if (!record.editable) {
      record.editable = !record.editable;
      setList([...list]);
    }
  }

  function handleBlur(record) {
    record.editable = !record.editable;
    setList([...list]);
  }

  function deleteData(id) {
    deleteById(id).then(() => queryAllData());
  }

  useEffect(() => {
    function getData() {
      queryById(match.params.id).then(res => setData(res.data));
    }

    getData();
  }, []);

  useEffect(() => {
    queryAllData();
  }, [queryParam]);

  function queryAllData() {
    queryAll().then(res => setList(res.data.list));
  }

  function onChange(e) {
    queryParam.pageNum = e.current;
    setQueryParam({ ...queryParam });
  }

  function newDirectory() {
    list.push({
      name: '',
      index: 1,
      editable: true,
    });
    setList([...list]);
  }

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Descriptions title="小说信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="小说名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="简介">{data.detail}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <div className="title">目录</div>
        <Table
          style={{ marginBottom: 24 }}
          dataSource={list}
          columns={columns}
          onChange={onChange}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={newDirectory}
          icon="plus"
        >
          添加章节
        </Button>
      </Card>
      <ContentEditor trogle={trogle} data={editorRecord} />
    </PageHeaderWrapper>
  );
};
