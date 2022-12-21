import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography, Form } from 'antd'
const { Title } = Typography
function CustomerOrderDetail () {
  //get order id
  const routeParams = useParams()
  const orderId = routeParams.orderid
  console.log(orderId)
  //存入data 代表Order details
  const [data, setData] = useState({
    Order_Date: "default"
  })
  useEffect(() => {
    async function getOrder () {
      if (typeof (orderId) !== "undefined") {
        const res = await axios.get(`http://127.0.0.1:8000/customer/profile/orders/${orderId}/details/`)
        console.log(res.data)
        setData(res.data)
      }
    }
    getOrder()
  }, [orderId])
  const [status, setStatus] = useState("default")
  useEffect(() => {
    if (typeof (data) !== "undefined") {
      if (data.Order_Status === "0")
        setStatus("Pending")
      else if (data.Order_Status === "1")
        setStatus("Out for Delivery")
      else if (data.Order_Status === "2")
        setStatus("Delivered")
      else if (data.Order_Status === "3")
        setStatus("Returned/Exchange")
      else if (data.Order_Status === "4")
        setStatus("Canceled")
    }
  }, [data])
  return (
    <>
      <div>
        <div className='viewPast'>

          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item>
              <Title level={5}>Order Details</Title>
            </Form.Item>
            <Form.Item label="OrderNumber">
              <Title level={5}>{orderId}</Title>
            </Form.Item>

            <Form.Item label="Order Status">
              <Title level={5}>{status}</Title>
            </Form.Item>

            <Form.Item label="Order Date">
              <Title level={5}>{data.Order_Date}</Title>
            </Form.Item>

          </Form>

        </div>
      </div>
    </>
  )
};

export default CustomerOrderDetail