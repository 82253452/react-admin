import React, { useEffect, useState } from 'react';
import { Form, Icon, message, Modal, Select, Upload } from 'antd';
import { update } from '@/services/directory';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
import { geToken } from '@/services/common';

export default function({ data, trogle = false }) {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(data.content));
  const [visible, setVisible] = useState(!trogle);
  const [uploaData, setUploaData] = useState({});
  const [headers, setHeaders] = useState({});
  const baseUrl = 'http://images.y456.cn/';

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(data.content));
  }, [data]);

  const controls = ['bold', 'italic', 'underline', 'separator', 'clear', 'separator'];
  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          data={uploaData}
          headers={headers}
          action="//up-z2.qiniup.com/"
        >
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button type="button" className="control-item button upload-button" data-title="插入图片">
            <Icon type="picture" theme="filled" />
          </button>
        </Upload>
      ),
    },
  ];

  async function beforeUpload(file) {
    await geToken().then(res => {
      setUploaData({ token: res.data });
      setHeaders({ Authorization: `UpToken ${res.data}` });
    });
  }

  function handleChange({ file }) {
    file.response &&
      setEditorState(
        ContentUtils.insertMedias(editorState, [
          {
            type: 'IMAGE',
            url: new URL(`${baseUrl}${file.response.key}`),
          },
        ]),
      );
  }

  function handleEditorChange(state) {
    setEditorState(state);
  }

  function submitContent() {
    data.content = editorState.toHTML();
    update(data);
  }

  function handleOk() {
    setVisible(!visible);
  }
  function handleCancel(e) {
    console.log(e);
    setVisible(!visible);
  }

  return (
    <Modal
      title="章节内容"
      visible={trogle === visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      okText="保存"
      cancelText="关闭"
    >
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        onSave={submitContent}
        controls={controls}
        extendControls={extendControls}
      />
    </Modal>
  );
}
