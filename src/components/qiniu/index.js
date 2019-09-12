import styles from './index.css';
import React, { useState, useRef } from 'react';
import * as qiniu from 'qiniu-js';
import { v4 } from 'uuid';
import { getQiniuToken } from '@/api/common';

export default function (props) {
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const observer = {
    next(res) {
      !uploading && setUploading(true);
      props.onProgress && props.onProgress(res);
    },
    error(err) {
      console.log(err);
      setUploading(false);
    },
    complete(res) {
      props.onSuccess && props.onSuccess(res);
    },
  };
  const open = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };
  const formatMaxSize = size => {
    if (!size) {
      return null;
    }
    size = size.toString().toUpperCase();
    let bsize; const m = size.indexOf('M'); const
k = size.indexOf('K');
    if (m > -1) {
      bsize = parseFloat(size.slice(0, m)) * 1024 * 1024;
    } else if (k > -1) {
      bsize = parseFloat(size.slice(0, k)) * 1024;
    } else {
      bsize = parseFloat(size);
    }
    return Math.abs(bsize);
  };
  const startUpload = () => {
    open();
  };
  const fileChange = e => {
    props.onChange && props.onChange(e);
    // todo
    // 显示上传中
    setUploading(true);
    // 获取文件
    let files = (e.dataTransfer && e.dataTransfer.files) || (e.target && e.target.files);
    !files && props.onError && props.onError({
      coed: 1,
      message: '获取文件错误',
    });
    // 返回
    if (!files) return;
    // 多文件上传？
    props.multiple ? (props.limit && (files = Array.prototype.slice.call(files, 0, props.limit))) : (files = Array.prototype.slice.call(files, 0, 1));
    // 文件大小限制
    const maxSizeLimit = formatMaxSize(props.maxSize);
    const err = !!maxSizeLimit && files.some(file => file.size > maxSizeLimit);
    err && props.onError && props.onError({
      coed: 1,
      message: `上传的文件大小超出了限制:${props.maxSize}`,
    });
    if (err) return;
    // 上传文件
    files.forEach(file => upload(file));
  };

  const upload = file => {
    props.beforeUpload && props.beforeUpload();
    if (!file || file.size === 0) return null;
    getQiniuToken().then(data => {
      if (data && data.data) {
        const observable = qiniu.upload(file, v4(), data.data, null, null);
        observable.subscribe(observer);
      } else {
        console.error('获取token失败！');
      }
    });
  };
  return (
    <div className={styles.container}>
      <div onClick={startUpload} className={styles.uplaod}>
        {props.children}
        <input type="file" ref={fileInputRef} className={styles.uplaodInput} onChange={fileChange}/>
      </div>
    </div>
  );
}
