import { Form, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

function ColumnForm({ form, trogle = false, handleSubmit, items, handleCancel }) {
  const { getFieldDecorator } = form;
  const [visible, setVisible] = useState(!trogle);

  const formRef = useRef(null);
  function handleOk() {
    form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }
      if (handleSubmit) handleSubmit(values);
    });
  }

  function onCancel() {
    setVisible(!visible);
    handleCancel && handleCancel();
  }
  return (
    <Modal title="新增" visible={trogle === visible} onOk={handleOk} onCancel={onCancel}>
      <Form ref={formRef} className="ant-advanced-search-form">
        {items &&
          items.length &&
          items.map(item => (
            <Form.Item
              key={item.id}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              label={item.label}
            >
              {item.render && getFieldDecorator(item.id, item.options)(item.render)}
            </Form.Item>
          ))}
      </Form>
    </Modal>
  );
}

export default Form.create()(ColumnForm);
