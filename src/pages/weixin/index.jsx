import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Icon, Input, Tag, Tooltip, Button } from 'antd';
import { getTeacher, setTeacher } from '@/services/weixin';
import './index.less'

export default () => {
  const [tags, setTags] = useState([])
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const measuredRef = useCallback(input => { if (input) { input.focus() } }, []);
  const memoizedValue = useMemo(() => tags.join(','), [tags]);

  useEffect(() => {
    getTeacher().then(data => data && data.result && setTags(data.result.split(',')))
  }, [])
  function onSave() {
    setTeacher({ name: memoizedValue })
  }

  function handleClose(removedTag) {
    const currentTags = tags.filter(tag => tag !== removedTag)
    setTags({ ...currentTags })
  }
  function handleInputChange(e) {
    setInputValue(e.target.value)
  }
  function handleInputConfirm() {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      setInputVisible(false);
      setInputValue('');
    }
  }
  function showInput() {
    setInputVisible(true);
  }

  return (<div>
    {tags.map((tag, index) => {
      const isLongTag = tag.length > 20;
      const tagElem = (
        <Tag key={tag} closable={index !== 0} onClose={() => handleClose(tag)}>
          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
        </Tag>
      );
      return isLongTag ? (
        <Tooltip title={tag} key={tag}>
          {tagElem}
        </Tooltip>
      ) : (
        tagElem
      );
    })}
    {inputVisible && (
      <Input
        ref={measuredRef}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    )}
    {!inputVisible && (
      <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
        <Icon type="plus"/> New Tag
      </Tag>
    )}
    <Button onClick={onSave}>保存</Button>
  </div>)
}
