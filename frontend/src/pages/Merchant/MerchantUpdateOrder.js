import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Select, Form, Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography
function MerchantUpdateOrder () {
  const routeParams = useParams()
  const curId = routeParams.id
  const orderId = routeParams.orderId
  const [shopId, setShopId] = useState()
  console.log(curId, orderId)
  //get shopid
  useEffect(() => {
    async function getShopId () {

      const res = await axios.get(`http://127.0.0.1:8000/merchant/${curId}/shop/`)
      console.log(res.data)
      console.log(res.data.Shop_ID)
      setShopId(res.data.Shop_ID)
    }
    getShopId()
  }, [curId])
  //get order
  //请求product数据
  const [orderLastData, setOrderLastData] = useState({

  })
  useEffect(() => {
    async function getOneOrder () {
      if (typeof (shopId) !== "undefined") {
        const res = await axios.get(`http://127.0.0.1:8000/merchant/shop/${shopId}/orders/${orderId}`)
        console.log(res.data)
        setOrderLastData(res.data)
      }
    }
    getOneOrder()
  }, [shopId, orderId])

  const [status, setStatus] = useState()
  const handleStatusChange = (value) => {
    setStatus(value)
  }
  const navigate = useNavigate()
  const updateOrder = async () => {
    console.log('status', status)
    await axios.put(`http://127.0.0.1:8000/merchant/shop/${shopId}/orders/${orderId}/update/`, {
      'order_status': status
    })
    navigate(`/${curId}/merchantHome/order`)
  }
  return (
    <div className='updateOrder'>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item>
          <Title level={5}>Last status:{orderLastData.Order_Status}</Title>
        </Form.Item>
        <Form.Item label="Set New Status">
          <Select onChange={handleStatusChange}>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Update">
          <Button onClick={updateOrder}>Update</Button>
        </Form.Item>
      </Form>
    </div>

  )
};

export default MerchantUpdateOrder