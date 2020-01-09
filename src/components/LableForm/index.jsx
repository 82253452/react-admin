import { Button, Col, Divider, Form, Input, Row } from 'antd';
import React from 'react';

function HeaderForm({ form, items, handleSearch, hanldeAdd }) {
  const { getFieldDecorator } = form;

  function onSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }
      if (handleSearch) handleSearch(values);
    });
  }

  function onAdd() {
    if (hanldeAdd) hanldeAdd();
  }

  return (
    <Form className="ant-advanced-search-form" onSubmit={onSubmit}>
      <Row>
        {items.map(i => (
          <Col span={8}>
            <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} label={i.label}>
              {getFieldDecorator(i.id)(i.render)}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Divider type="vertical" />
          {hanldeAdd && (
            <Button type="primary" onClick={onAdd}>
              添加
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create()(HeaderForm);
