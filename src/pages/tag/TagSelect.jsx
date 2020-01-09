import React, { useEffect } from 'react';
import { Select } from 'antd';

export default function({ tags, onChange }) {
  useEffect(() => {}, []);

  function handleTagChange(value) {
    const data = value.map(id => findInTag(id));
    onChange && onChange(data);
  }

  function findInTag(id) {
    return { tag: { id }, name: tags.find(t => t.id === id).name };
  }

  return (
    <Select mode="multiple" onChange={handleTagChange}>
      {tags.map(option => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
}
