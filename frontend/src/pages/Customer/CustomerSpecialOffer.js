

import { useState, useEffect } from "react"
import { Table } from "antd"
import { useParams } from 'react-router-dom'
import axios from "axios"



function CustomerSpecialOffer () {

  //get customer id
  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)



  //存入data 代表全部Speical Offer
  const [data, setData] = useState()
  useEffect(() => {
    async function getSpecialOffer () {
      if (typeof (curId) !== "undefined") {
        const res = await axios.get(`http://127.0.0.1:8000/customer/special/offers/${curId}`)
        console.log(res.data)
        if (res.data !== "No offer") {
          setData(res.data)
        }


      }
    }
    getSpecialOffer()
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
      title: 'Shop_ID',
      dataIndex: 'Shop_ID',
      key: 'Shop_ID',
    },
    {
      title: 'Discount',
      dataIndex: 'Discount',
      key: 'Discount',
    },
    {
      title: 'Coupon',
      dataIndex: 'Coupon',
      key: 'Coupon',
    },

  ]


  return (
    <>
      <div>
        Special Offers
      </div>
      <Table dataSource={data} columns={columns} />;
    </>
  )
};

export default CustomerSpecialOffer