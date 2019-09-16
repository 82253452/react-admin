import React, { useState, useRef, useEffect } from 'react';
import { Icon, Modal, Upload } from 'antd';
import { geToken } from '@/services/common'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const baseUrl = 'http://pxczv9bs6.bkt.clouddn.com/'

export default function (props) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [img, setImg] = useState('');
  const [fileLists, setFileLists] = useState([]);
  const [uploaData, setUploaData] = useState({});
  const [headers, setHeaders] = useState({});
  useEffect(() => {
    props.single ? setImg(props.value) : setFileLists(props.value ? props.value.split(',').map((url, uid) => ({ url, uid })) : [])
  }, [props.value])

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true)
  }
  const handleChange = ({ file, fileList }) => {
    if (props.single) {
      file.response && props.onChange && props.onChange(`${baseUrl}${file.response.key}`);
      file.response && (setImg(`${baseUrl}${file.response.key}`));
      return
  }
    file.response && props.onChange && props.onChange(`${props.value ? `${props.value},` : ''}${baseUrl}${file.response.key}`);
    setFileLists([...fileList])
  }

  const uploadButton = (
    <div>
      <Icon type="plus"/>
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  async function beforeUpload(file) {
    await geToken().then(data => {
      setUploaData({ token: data.data })
      setHeaders({ Authorization: `UpToken ${data.data}` })
    })
  }

  return <div className="clearfix">
    <Upload
      showUploadList={!props.single}
      headers={headers}
      action="//up-z2.qiniup.com/"
      listType="picture-card"
      fileList={fileLists}
      data={uploaData}
      beforeUpload={beforeUpload}
      onPreview={handlePreview}
      onChange={handleChange}
    >
      {!!img && <img src={img} alt="avatar" style={{ width: '100%' }} /> }
      {!img && uploadButton}
    </Upload>
    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
      <img alt="example" style={{ width: '100%' }} src={previewImage}/>
    </Modal>
  </div>
}
