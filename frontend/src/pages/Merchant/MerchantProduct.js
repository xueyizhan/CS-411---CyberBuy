import { useState } from 'react'
import { Input, Row, Col, Table, Popconfirm, Button } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'


function MerchantProduct () {
  //开始时请求shopid 

  //从url中获取merchant id 再获取shop id
  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)
  const [shopId, setShopId] = useState()

  useEffect(() => {
    async function getShopId () {
      const res = await axios.get(`http://127.0.0.1:8000/merchant/${curId}/shop/`)
      console.log(res)
      console.log(res.data.Shop_ID)
      setShopId(res.data.Shop_ID)
    }
    getShopId()
  }, [curId])
  //存入data 代表全部商品
  const [data, setData] = useState()
  useEffect(() => {
    async function getProduct () {
      if (typeof (shopId) !== "undefined") {
        const res = await axios.get(`http://127.0.0.1:8000/merchant/shop/${shopId}/products/`)
        console.log(res.data)
        setData(res.data)
      }
    }
    getProduct()
  }, [shopId])



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
      dataIndex: 'Operation',
      render: (_, record) =>
      (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(_, record)}>
          <Button>Delete</Button>
        </Popconfirm>
      )
    },
    {
      title: 'Operation2',
      dataIndex: 'Operation2',
      render: (_, record) =>
      (

        <Button onClick={() => handleUpdate(_, record)}>Update Product</Button>

      )
    },
  ]
  //delete product
  const handleDelete = async (_, record) => {
    console.log(_, record.product_id)
    //发送delete请求
    if (record.product_type === "Computer") {
      console.log('delete computer')
      console.log(shopId)
      await axios.delete(`http://127.0.0.1:8000/merchant/shop/products/${record.Product_ID}/computer/description/delete/`)
      await axios.delete(`http://127.0.0.1:8000/merchant/shop/${shopId}/products/${record.Product_ID}/delete/`)
    }
    else if (record.product_type === "Cellphone") {
      console.log('delete cellphone')
      console.log(shopId)
      await axios.delete(`http://127.0.0.1:8000/merchant/shop/products/${record.Product_ID}/cellphone/description/delete/`)
      await axios.delete(`http://127.0.0.1:8000/merchant/shop/${shopId}/products/${record.Product_ID}/delete/`)
    }
    else {
      console.log('delete videogame')

      await axios.delete(`http://127.0.0.1:8000/merchant/shop/products/${record.Product_ID}/videogame/description/delete/`)
      await axios.delete(`http://127.0.0.1:8000/merchant/shop/${shopId}/products/${record.Product_ID}/delete/`)
    }
    const res = await axios.get(`http://127.0.0.1:8000/merchant/shop/${shopId}/products/`)
    console.log(res.data)
    setData(res.data)

  }

  //update product 
  const navigate = useNavigate()
  const handleUpdate = (_, record) => {
    console.log(_, record.Product_ID)
    navigate(`/${curId}/merchantHome/updateProduct/${record.Product_ID}`)
  }



  //search
  const { Search } = Input
  const startSearch = async (value) => {
    console.log('search', value)
    //请求数据
    const res = await axios.post(`http://127.0.0.1:8000/merchant/shop/${shopId}/search/products/`, {
      "shop_id": shopId,
      "title": `%${value}%`
    })
    console.log(res.data)
    setData(res.data)
  }


  return (
    <>
      <div>
        <Row className="offsetMerSearch">
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
        <Table dataSource={data} columns={columns} className="offsettable" />

      </div>
    </>
  )
};

export default MerchantProduct