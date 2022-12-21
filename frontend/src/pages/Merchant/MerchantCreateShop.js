import { Form, Input, Button } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
/*
{
  "Shop_Name": "TestShop",
  "Contact_Number": "testnumber",
  "Merchant_ID": 9290
}
*/
function MerchantCreateShop () {



  const routeParams = useParams()
  const curId = routeParams.id
  const navigate = useNavigate()

  const [Shop_Name, setShopName] = useState('')
  const [Contact_Number, setContactNumber] = useState('')

  const [failSta, setFailSta] = useState('default')
  const handleCreate = async () => {
    console.log(Shop_Name)
    console.log(Contact_Number)
    console.log(curId)
    console.log('create')
    const res = await axios.post(`http://127.0.0.1:8000/merchant/${curId}/create_shop/`, {
      "Shop_Name": Shop_Name,
      "Contact_Number": Contact_Number,
    })
    console.log(res)
    if (res.data !== "You already have a shop!")
      navigate(`/${curId}/merchantHome/`)
    else
      setFailSta('False')
  }

  function Fail () {
    if (failSta === 'default')
      return (
        <div></div>
      )
    else
      return (
        <div>'You already have a shop!'</div>
      )
  }
  return (
    <div className='createShop'>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >

        <Form.Item label="Shop_Name">
          <Input onChange={(e) => setShopName(e.target.value)} />
        </Form.Item>

        <Form.Item label="Contact_Number">
          <Input onChange={(e) => setContactNumber(e.target.value)} />
        </Form.Item>
        <Fail />
        <Form.Item label="Create">
          <Button onClick={handleCreate}>Create Your Shop</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default MerchantCreateShop