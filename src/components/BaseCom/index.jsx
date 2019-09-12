import React, { useEffect, useRef, useState } from 'react';
import { Divider, Input, Popconfirm, Select, Table } from 'antd';
import HeaderForm from '@/components/LableForm/index'
import ColumnForm from '@/components/ColumnForm/index'
import QiniuUpload from '@/components/qiniu/upload'
import './index.less'
import { deleteById, queryAll } from '@/services/shop'
import { queryAll as queryClassify } from '@/services/classify'
import { queryAll as quryAddress } from '@/services/address'

export default props => {
  const [list, setList] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [addressChildrenList, setAddressChildrenList] = useState([]);
  const [clissifyList, setClissifyList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSise: 10, pageNum: 1 });
  const formRef = useRef(null);
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => (
        <span>
        <a onClick={() => modify(record)}>修改</a>
        <Divider type="vertical"/>
          <Popconfirm
            title="确定删除数据?"
            onConfirm={() => deleteData(record.id)}
            okText="确定"
            cancelText="取消"
          >
          <a href="#">删除</a>
        </Popconfirm>
      </span>
      ),
    },
  ];
  const items = [
    {
      id: 'id',
      render: <Input hidden/>,
    },
    {
      label: '名称',
      id: 'name',
      options: {},
      render: <Input placeholder="名称"/>,
    },
    {
      label: '地址',
      id: 'address',
      options: {},
      render: <Input placeholder="地址"/>,
    },
    {
      label: '分类',
      id: 'classifyId',
      options: {},
      render: <Select>
        {
          clissifyList.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
        }
      </Select>,
    },
    {
      label: '商圈',
      id: 'addressId',
      render: <Test addressList={addressList}></Test>,
    },
    {
      label: 'logo图片',
      id: 'image',
      render: <QiniuUpload single/>,
    },
    {
      label: '店内图片',
      id: 'images',
      render: <QiniuUpload/>,
    },
  ];

  useEffect(() => {
    queryClassify().then(data => {
      data && data.data && setClissifyList([...data.data])
    })
    quryAddress().then(data => data && data.data && setAddressList([...data.data]))
  }, [])

  function selectChange(id) {
    // setAddressChildrenList([...(addressList.filter(c => c.id === id).children)])
    const select = addressList.filter(c => c.id === id)[0];
    select && select.children && setAddressChildrenList([...select.children])
  }

  useEffect(() => {
    queryAllData();
  }, [queryParam])

  function queryAllData() {
    queryAll(queryParam).then(data => data && data.data && setList(data.data))
  }
  function successUpload() {
  }

  function onChange(e) {
    queryParam.pageNum = e.current;
    setQueryParam({ ...queryParam })
  }

  function modify(record) {
    setVisible(true)
    formRef.current.setFieldsValue(record)
  }

  function deleteData(id) {
    deleteById(id).then(() => queryAllData())
  }

  function handleSearch(values) {
    setQueryParam({ ...queryParam, ...values });
  }

  function hanldeAdd() {
    formRef.current.resetFields()
    setVisible(true)
  }

  function handleSubmit(value) {
    setVisible(false)
    saveOrUpdate(value).then(() => queryAllData())
  }

  return (<div>
    <HeaderForm handleSearch={handleSearch} hanldeAdd={hanldeAdd}/>
    <Table columns={columns} dataSource={list} onChange={onChange}/>
    <ColumnForm ref={formRef} visible={visible} handleSubmit={handleSubmit} items={items}
                handleCancel={() => setVisible(false)}></ColumnForm>
  </div>)
}
const Test = React.forwardRef(({ addressList, value, onChange }, ref) => {
  const [firstSelect, setFirstSelect] = useState('');
  const [lastSelect, setLastSelect] = useState('');
  const [addressChildrenList, setAddressChildrenList] = useState([]);

  useEffect(() => {
    setLastSelect(value)
    if (!value) {
      setAddressChildrenList([])
    } else {
     const selectAddress = addressList.filter(address => address.children.some(child => child.id == value))
      selectAddress && setFirstSelect(selectAddress[0].id)
      selectAddress && setAddressChildrenList([...selectAddress[0].children])
    }
  }, [value])
  function selectChange(id) {
    // setAddressChildrenList([...(addressList.filter(c => c.id === id).children)])
    setFirstSelect(id)
    const select = addressList.filter(c => c.id === id)[0];
    select && select.children && setAddressChildrenList([...select.children])
  }

  function lastChange(value) {
    setLastSelect(value)
    onChange && onChange(value)
  }

  return (<div ref={ref}>
    <Select onChange={id => selectChange(id)} value={firstSelect}>
      {addressList.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}
    </Select>
    <Select onChange={lastChange} value={lastSelect}>
      {
        addressChildrenList.length && addressChildrenList.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
      }
    </Select>
  </div>)
})
