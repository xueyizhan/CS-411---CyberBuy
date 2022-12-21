import { useState, useEffect } from "react"
import { Table, Button } from "antd"
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"



function MerchantOrder () {

  //get shop id
  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)

  const [shopId, setShopId] = useState()

  useEffect(() => {
    async function getShopId () {
      const res = await axios.get(`http://127.0.0.1:8000/merchant/${curId}/shop/`)
      console.log(res.data.Shop_ID)
      setShopId(res.data.Shop_ID)

    }
    getShopId()
  }, [curId])
  //存入data 代表全部Order
  const [data, setData] = useState()
  useEffect(() => {
    async function getOrder () {
      if (typeof (shopId) !== "undefined") {
        const res = await axios.get(`http://127.0.0.1:8000/merchant/shop/${shopId}/orders/`)
        console.log(res.data)
        setData(res.data)
      }
    }
    getOrder()
  }, [shopId])




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

        <Button onClick={() => handleUpdate(_, record)}>Update Order</Button>

      )
    },
  ]


  //update order
  const navigate = useNavigate()
  const handleUpdate = (_, record) => {
    console.log(_, record.Order_Number)
    navigate(`/${curId}/merchantHome/updateOrder/${record.Order_Number}`)
  }

  return (
    <>
      <div>
        MerchantOrder
      </div>
      <Table dataSource={data} columns={columns} />;
    </>
  )
};

export default MerchantOrder