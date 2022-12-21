
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Table, Button, InputNumber } from "antd"
import axios from "axios"


function CustomerViewProduct () {

  //get info from url
  const routeParams = useParams()
  const curId = routeParams.id
  console.log('customerid:', curId)
  const productId = routeParams.productid
  const type = routeParams.producttype
  console.log('type:', type)

  const [data, setData] = useState()

  //const productname = routeParams.productname + '.jpg'
  //console.log(productname)


  //columns 
  //columnsOfVideogame
  const columnsOfVideogame = [
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
      title: 'Game_Platform',
      key: 'Game_Platform',
      dataIndex: 'Game_Platform',

    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      render: (_, record) =>
      (

        <InputNumber min={0} defaultValue={0} onChange={(e) => handleChange(e, record)} />

      )
    },
    {
      title: 'Operation',
      dataIndex: 'Operation',
      render: (_, record) =>
      (

        <Button onClick={() => addToCart(_, record)}>Add to Cart</Button>

      )
    },
  ]
  //columnsOfComputer
  const columnsOfComputer = [
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
      title: 'RAM',
      key: 'RAM',
      dataIndex: 'RAM',
    },
    {
      title: 'Size',
      key: 'Size',
      dataIndex: 'Size',
    },
    {
      title: 'Storages',
      key: 'Storages',
      dataIndex: 'Storages',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      render: (_, record) =>
      (

        <InputNumber min={0} defaultValue={0} onChange={(e) => handleChange(e, record)} />

      )
    },
    {
      title: 'Operation',
      dataIndex: 'Operation',
      render: (_, record) =>
      (

        <Button onClick={() => addToCart(_, record)}>Add to Cart</Button>

      )
    },
  ]
  //columnsOfCellphone
  const columnsOfCellphone = [
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
      title: 'Color',
      key: 'Color',
      dataIndex: 'Color',
    },
    {
      title: 'Storages',
      key: 'Storages:',
      dataIndex: 'Storages',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      render: (_, record) =>
      (

        <InputNumber min={0} defaultValue={0} onChange={(e) => handleChange(e, record)} />

      )
    },
    {
      title: 'Operation',
      dataIndex: 'Operation',
      render: (_, record) =>
      (

        <Button onClick={() => addToCart(_, record)}>Add to Cart</Button>

      )
    },
  ]
  const addToCart = async (_, record) => {
    console.log("add to cart", record)
    const res = await axios.post(`http://127.0.0.1:8000/customer/cart/add/`,
      {
        "Customer_ID": curId,
        "Product_ID": record.Product_ID,
        "Quantity": record.quantity
      })
    console.log(res.data)
  }
  const handleChange = (e, record) => {
    console.log('change:', e)
    console.log(record)
    record.quantity = e
  }
  //get data
  useEffect(() => {
    async function getProdcutSeries () {
      var res = []
      if (type === "Computer") {
        res = await axios.get(`http://127.0.0.1:8000/customer/show/computer/${productId}/`)
        console.log(res.data)
        setData(res.data)

      }

      else if (type === "Cellphone") {
        res = await axios.get(`http://127.0.0.1:8000/customer/show/cellphone/${productId}/`)
        console.log(res.data)
        setData(res.data)
      }

      else {
        res = await axios.get(`http://127.0.0.1:8000/customer/show/videogame/${productId}/`)
        console.log(res.data)
        setData(res.data)
      }

    }
    getProdcutSeries()
  }, [type, productId])

  return (
    <>

      {/*<img src={require('./asset/' + productname)} alt="" />*/}
      <div className='productDetails'>
        {(type === "Videogame") ?
          <Table dataSource={data} columns={columnsOfVideogame} />
          : (type === "Computer") ?
            <Table dataSource={data} columns={columnsOfComputer} />
            :
            <Table dataSource={data} columns={columnsOfCellphone} />}


      </div>
    </>
  )
}
export default CustomerViewProduct