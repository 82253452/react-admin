import { Form, Modal } from 'antd';
import React, { useRef, useState } from 'react';

function ColumnForm(props) {
  const { getFieldDecorator } = props.form;
  const formRef = useRef(null);
  function handleOk() {
    props.form.validateFields((err, values) => {
      if (err) {
        console.log(err)
        return;
      }
      if (props.handleSubmit) props.handleSubmit(values);
    });
  }

  function handleCancel() {
    props.handleCancel && props.handleCancel()
  }
  return (<Modal
    title="新增"
    visible={props.visible}
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <Form ref={formRef} className="ant-advanced-search-form">
      {
        props.items && props.items.length && props.items.map(item =>
          <Form.Item key={item.id} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} label={item.label}>
          {item.render && getFieldDecorator(item.id, item.options)(item.render)}
        </Form.Item>)
      }
    </Form>
  </Modal>)
}

export default Form.create()(ColumnForm);
