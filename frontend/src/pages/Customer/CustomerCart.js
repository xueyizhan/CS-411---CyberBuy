import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Table, Button, InputNumber, Input, Form, Typography, Select } from "antd"
import axios from "axios"
const { Title } = Typography


function CustomerCart () {
  //get info from url
  const routeParams = useParams()
  const curId = routeParams.id

  const [data, setData] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  useEffect(() => {
    async function getData () {
      const res = await axios.get(`http://127.0.0.1:8000/customer/cart/${curId}/`)
      //console.log(res.data)
      if (res.data !== "Your cart is empty")
        setData(res.data)
    }
    getData()
  }, [curId])

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
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',

    },
    {
      title: 'New Quantity',
      dataIndex: 'New Quantity',
      render: (_, record) =>
      (
        <>
          <InputNumber min={0} defaultValue={0} onChange={(e) => handleChange(e, record)} />
          <Button onClick={() => updateCart(_, record)}>Update</Button>
        </>
      )
    },
    {
      title: 'Use Coupon',
      dataIndex: 'Use Coupon',
      render: (_, record) =>
      (
        <>
          <Input onChange={(e) => handleCoupon(e, record)} />
          <Button onClick={() => confirmCoupon(_, record)}>Confirm</Button>
        </>
      )
    },
    {
      title: 'Operation',
      dataIndex: 'Operation',
      render: (_, record) =>
      (

        <Button onClick={() => deleteFromCart(_, record)}>Delete</Button>

      )
    },


  ]

  const deleteFromCart = async (_, record) => {
    console.log("delete", record)
    const res1 = await axios.delete(`http://127.0.0.1:8000/customer/cart/${curId}/delete/${record.Product_ID}/`)
    console.log(res1)
    const res2 = await axios.get(`http://127.0.0.1:8000/customer/cart/${curId}/`)
    console.log(res2.data)
    if (res2.data !== "Your cart is empty")
      setData(res2.data)
  }

  const handleChange = (e, record) => {
    console.log('change:', e)
    console.log(record)
    record.newquantity = e
  }
  const updateCart = async (_, record) => {
    console.log("update", record)
    await axios.put(`http://127.0.0.1:8000/customer/cart/${curId}/update/`,
      {
        "Product_ID": record.Product_ID,
        "Quantity": record.newquantity
      })
    const res2 = await axios.get(`http://127.0.0.1:8000/customer/cart/${curId}/`)
    console.log(res2.data)
    setData(res2.data)
  }

  //cal total price
  useEffect(() => {
    var newPrice = 0
    console.log("start")
    console.log("total price", totalPrice)

    for (let index in data) {
      console.log("INDEX", index)
      newPrice = newPrice + data[index].quantity * data[index].Price
      console.log(data[index].quantity * data[index].Price)
    }
    console.log("new price", newPrice)
    setTotalPrice(newPrice)
    console.log("end")
  }, [data])
  console.log("total price out", totalPrice)


  //coupon 
  const [couponCode, setCouponCode] = useState(0)
  const [couponProduct, setCouponProduct] = useState(0)
  const handleCoupon = async (e, record) => {
    record.coupon = e.target.value
    //console.log(record)
  }
  const confirmCoupon = async (_, record) => {
    setCouponCode(record.coupon)
    setCouponProduct(record.Product_ID)
    const res = await axios.put(`http://localhost:8000/customer/check/coupon/${curId}`, {

      "Coupon": record.coupon,
      "Product_ID": record.Product_ID
    })
    console.log(res.data)
    var discount = res.data.Discount
    record.Price = record.Price * discount / 100
    console.log(data)
    //cal total price again for updating
    var newPrice = 0
    for (let index in data) {
      console.log("INDEX", index)
      newPrice = newPrice + data[index].quantity * data[index].Price
      console.log(data[index].quantity * data[index].Price)
    }
    console.log("new price", newPrice)
    setTotalPrice(newPrice)
    console.log("end")
    console.log("total price out", totalPrice)
  }


  //place order
  const [paymentType, setPaymentType] = useState()
  const [cardNumber, setCardNumber] = useState()
  const handleTypeChange = (value) => {
    setPaymentType(value)
  }
  const [outOfProduct, setOutOfProduct] = useState(0)
  const [success, setSuccess] = useState(0)
  const placeOrder = async () => {
    // console.log("payment", paymentType)
    // console.log("cardnum", cardNumber)
    // console.log("coupon", couponCode)
    // console.log("couponproduct", couponProduct)
    var enoughTag = 1
    for (let index in data) {
      console.log("INDEX", index)
      if (data[index].quantity > data[index].Stock)
        enoughTag = 0
    }
    if (enoughTag === 0) {
      setOutOfProduct(1)
      console.log("out of it")
    }
    else {
      setOutOfProduct(0)
      console.log("place")
      var res
      if (couponCode === 0 || couponProduct === 0) {
        res = await axios.post(`http://localhost:8000/customer/place/order/${curId}`, {
          "Payment_type": paymentType,
          "Card_number": cardNumber,
          "coupon_code": null,
          "Product_ID": null
        })
      }
      else {
        res = await axios.post(`http://localhost:8000/customer/place/order/${curId}`, {
          "Payment_type": paymentType,
          "Card_number": cardNumber,
          "coupon_code": couponCode,
          "Product_ID": couponProduct
        })
      }
      setSuccess(1)
      console.log(res)
    }
  }
  return (
    <>
      <div>
        Cart
      </div>
      <div>Total Price:{totalPrice}</div>
      <Table dataSource={data} columns={columns} />
      <div className='placeOrder'>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item>
            <Title level={5}>Place Your Order Here!</Title>
          </Form.Item>
          <Form.Item label="Payment Type">
            <Select onChange={handleTypeChange}>
              <Select.Option value="Credit Card">Credit Card</Select.Option>
              <Select.Option value="Debit Card">Debit Card</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Card Number">
            <Input onChange={(e) => setCardNumber(e.target.value)} />
          </Form.Item>
          {outOfProduct === 1 ? <div>Quantity Over Stock!</div> : <></>}
          {success === 1 ? <div>Place order successfully</div> : <></>}
          <Form.Item label="Place Order">
            <Button onClick={placeOrder}>Place Order</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
};

export default CustomerCart