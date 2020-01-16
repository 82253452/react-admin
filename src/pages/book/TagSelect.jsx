import React, { useEffect, useState } from 'react';
import { message, Select } from 'antd';

export default function({ tags, onChange, max, value = [] }) {
  function handleTagChange(v) {
    if (max && v.length > max) {
      message.error(`最多选择${max}个`);
      return;
    }
    const data = v.map(id => findInTag(id));
    onChange && onChange(data);
  }

  function findInTag(id) {
    return { tag: { id }, name: tags.find(t => t.id === id).name };
  }

  return (
    <Select
      mode="multiple"
      onChange={handleTagChange}
      value={value.map(v => (v.tag ? v.tag.id : v.tagid))}
    >
      {tags.map(option => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
}
