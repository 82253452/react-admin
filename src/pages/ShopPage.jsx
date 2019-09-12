import React, { useState } from 'react';
import { Table, Divider, Tag, Form, Row, Col, Input, Button, Icon } from 'antd';
import { queryAll } from '@/services/shop';

function Test(props) {
  const [expand, setExpand] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical"/>
        <a>Delete</a>
      </span>
      ),
    },
  ];

  function handleSearch() {

  }

  return (<div>
    <div>
      <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
        <Row>
          <Col span={8}>
            <Form.Item label="标题">
              <Input placeholder="标题"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
    <Table columns={columns} dataSource={data}/>
  </div>)
}

export default Form.create()(Test);
