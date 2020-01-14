import React, { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, Input, Popconfirm, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ContentEditor from '@/pages/book/ContentEditor';
import BookContainer from '@/hookModels/book';
import DirectoryContainer from '@/hookModels/directory';

export default ({ match }) => {
  const { data, query } = BookContainer.useContainer();
  const {
    list,
    fetch,
    addDirectory,
    deleteData,
    modify,
    changePage,
    modifyName,
    modifyData,
  } = DirectoryContainer.useContainer();
  const [trogle, setTrogle] = useState(false);

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
              onChange={e => modifyName(record, e)}
              onBlur={() => modify(record)}
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
              modifyData(record);
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

  useEffect(() => {
    query(match.params.id);
    fetch();
  }, []);

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Descriptions title="基本信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="小说名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="简介">{data.detail}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="统计" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="点赞数">123</Descriptions.Item>
          <Descriptions.Item label="浏览量">12343242</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <div className="title">目录</div>
        <Table
          style={{ marginBottom: 24 }}
          dataSource={list}
          columns={columns}
          onChange={changePage}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={addDirectory}
          icon="plus"
        >
          添加章节
        </Button>
      </Card>
      <ContentEditor trogle={trogle} />
    </PageHeaderWrapper>
  );
};
