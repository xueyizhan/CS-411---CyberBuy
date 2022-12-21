

import { useState, useEffect } from "react"
import { Table, Button } from "antd"
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"



function CustomerOrder () {

  //get customer id
  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)



  //存入data 代表全部Order
  const [data, setData] = useState()
  useEffect(() => {
    async function getOrder () {
      if (typeof (curId) !== "undefined") {
        const res = await axios.get(`http://127.0.0.1:8000/customer/profile/orders/${curId}/`)
        console.log(res.data)
        setData(res.data)
      }
    }
    getOrder()
  }, [curId])




  const columns = [
    {
      title: 'Order_Number',
      dataIndex: 'Order_Number',
      key: 'Order_Number',
    },
    {
      title: 'Order_Status',
      dataIndex: 'Order_Status',
      key: 'Order_Status',
    },
    {
      title: 'Order_Date',
      dataIndex: 'Order_Date',
      key: 'Order_Date',
    },
    {
      title: 'Operation',
      dataIndex: 'Operation',
      render: (_, record) =>
      (

        <Button onClick={() => handleView(_, record)}>View Order Details</Button>

      )
    },
  ]


  //view order details
  const navigate = useNavigate()
  const handleView = (_, record) => {
    console.log(_, record.Order_Number)
    navigate(`/${curId}/customerHome/orderdetail/${record.Order_Number}`)
  }

  return (
    <>
      <div>
        Customer Order
      </div>
      <Table dataSource={data} columns={columns} />;
    </>
  )
};

export default CustomerOrder