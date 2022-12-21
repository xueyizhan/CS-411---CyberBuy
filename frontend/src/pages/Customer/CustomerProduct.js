import { Menu } from 'antd'
import React, { useState } from 'react'
import { AppstoreOutlined } from '@ant-design/icons'
import { Input, Row, Col } from 'antd'
import { useEffect } from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const { Search } = Input
function CustomerProduct () {
  //get customer id 
  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)
  //data column
  const columns = [
    {
      title: 'Product_ID',
      dataIndex: 'Product_ID',
      key: 'Product_ID',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Product_Type',
      dataIndex: 'Product_Type',
      key: 'Product_Type',
    },
    {
      title: 'Stock',
      key: 'Stock',
      dataIndex: 'Stock',

    },
    {
      title: 'Operation1',
      dataIndex: 'Operation1',
      render: (_, record) =>
      (

        <Button onClick={() => viewOneProduct(_, record)}>View Product</Button>

      )
    },
  ]
  const [data, setData] = useState([])

  //get all product

  useEffect(() => {
    async function getProduct () {
      //todo
      const res = await axios.get(`http://127.0.0.1:8000/customer/show/all/`)
      console.log(res.data)
      setData(res.data)
    }
    getProduct()
  }, [])


  //to view one product 
  const navigate = useNavigate()
  const viewOneProduct = (_, record) => {
    console.log(record.Product_ID)
    console.log(record.Product_Type)
    navigate(`/${curId}/customerHome/viewProduct/${record.Product_ID}/${record.Product_Type}`)
  }

  //keyword search
  const startSearch = async (value) => {
    console.log('search', value)

    const res = await axios.get(`http://127.0.0.1:8000/customer/search/${value}`)
    console.log(res)
    setData(res.data)
  }
  //filter by type
  const toComputer = async () => {
    console.log('toComputer')
    const res = await axios.get(`http://127.0.0.1:8000/customer/show/computer/`)
    console.log(res.data)
    setData(res.data)
  }

  const toVideogame = async () => {
    console.log('toVideo')
    const res = await axios.get(`http://127.0.0.1:8000/customer/show/videogame/`)
    console.log(res.data)
    setData(res.data)
  }
  const toCellphone = async () => {
    console.log('toCell')
    const res = await axios.get(`http://127.0.0.1:8000/customer/show/cellphone/`)
    console.log(res.data)
    setData(res.data)

  }

  //navigation column
  function getItem (label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }
  const rootSubmenuKeys = ['sub1']
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const items = [
    getItem('Product Type', 'sub1', <AppstoreOutlined />, [
      getItem('Cellphone', '1', <AppstoreOutlined onClick={toCellphone} />),
      getItem('Computer', '2', <AppstoreOutlined onClick={toComputer} />),
      getItem('Videogame', '3', <AppstoreOutlined onClick={toVideogame} />)
    ])
  ]
  return (
    <>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={items}
      />
      <Row className="offsetCusSearch">
        <Col>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={startSearch}
          />
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} className="offsettableForCustomer" />

    </>
  )
};

export default CustomerProduct