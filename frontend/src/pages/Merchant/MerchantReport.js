import { useState, useEffect } from "react"
import { Table } from "antd"
import { useParams } from "react-router-dom"
import axios from "axios"
import * as echarts from "echarts"


function MerchantReport () {
  const columns1 = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Selling_Quantity',
      dataIndex: 'Selling_Quantity',
      key: 'Selling_Quantity',
    },
  ]

  const columns2 = [
    {
      title: 'Customer_ID',
      dataIndex: 'Customer_ID',
      key: 'Customer_ID',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Contact_number',
      dataIndex: 'Contact_number',
      key: 'Contact_number',
    },
    {
      title: 'buyNum',
      key: 'buyNum',
      dataIndex: 'buyNum',

    },

  ]
  const [data1, setData1] = useState()
  const [data2, setData2] = useState()




  //开始时请求shopid 

  //从url中获取merchant id 再获取shop id
  const routeParams = useParams()
  const curId = routeParams.id
  //console.log(curId)
  const [shopId, setShopId] = useState()

  //存入data1 代表sales

  useEffect(() => {
    async function getProduct1 () {
      if (typeof (shopId) !== "undefined") {
        const res1 = await axios.get(`http://127.0.0.1:8000/merchant/shop/${shopId}/sales/`)
        console.log('sales', res1.data, shopId)
        setData1(res1.data)
      }

    }
    getProduct1()
  }, [shopId])
  //存入data2 代表VIP
  useEffect(() => {
    async function getProduct2 () {
      if (typeof (shopId) !== "undefined") {
        const res2 = await axios.get(`http://127.0.0.1:8000//merchant/shop/${shopId}/vip/15`)
        console.log('vip', res2.data, shopId)
        setData2(res2.data)
      }

    }
    getProduct2()
  }, [shopId])

  useEffect(() => {
    async function getShopId () {
      const res = await axios.get(`http://127.0.0.1:8000/merchant/${curId}/shop/`)
      //console.log(res, curId)
      //console.log(res.data[0].shop_id)
      setShopId(res.data.Shop_ID)
    }
    getShopId()
  }, [curId])




  //1st chart sales

  useEffect(() => {
    if (typeof (data1) !== "undefined") {
      // Initialize the echarts instance based on the prepared dom
      var myChart = echarts.init(document.getElementById('sales'))

      var x1 = data1.map((item, index) => {
        return item.Title
      })
      var y1 = data1.map((item, index) => {
        return item.Selling_Quantity
      })


      // Specify the configuration items and data for the chart
      var option = {
        title: {
          text: 'Report of Sales'
        },
        tooltip: {},
        legend: {
          data: ['sales']
        },
        xAxis: {
          data: x1
        },
        yAxis: {},
        series: [
          {
            name: 'sales',
            type: 'bar',
            data: y1
          }
        ]
      }

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option)
    }
  }, [data1])


  //2nd regular customer
  useEffect(() => {
    if (typeof (data2) !== "undefined") {
      // Initialize the echarts instance based on the prepared dom
      var myChart = echarts.init(document.getElementById('regular'))

      var x2 = data2.map((item, index) => {
        return item.Customer_ID
      })
      var y2 = data2.map((item, index) => {
        return item.buyNum
      })


      // Specify the configuration items and data for the chart
      var option = {
        title: {
          text: 'Report of Regular Customer'
        },
        tooltip: {},
        legend: {
          data: ['buy num']
        },
        xAxis: {
          data: x2
        },
        yAxis: {},
        series: [
          {
            name: 'buy num',
            type: 'bar',
            data: y2
          }
        ]
      }

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option)
    }
  }, [data2])

  return (
    <>
      <div>
        This is Sales Report
      </div>
      <Table dataSource={data1} columns={columns1} />
      <div >
        <div id="sales" style={{ width: "1200px", height: "400px" }}></div>
      </div>
      <div>
        This is Regular Customers
      </div>
      <Table dataSource={data2} columns={columns2} />
      <div >
        <div id="regular" style={{ width: "1200px", height: "400px" }}></div>
      </div>

    </>
  )
};

export default MerchantReport