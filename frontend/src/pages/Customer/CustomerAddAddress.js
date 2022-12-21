import { Form, Input, Button } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.scss'

function CustomerAddAddress () {
  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)

  const [state, setState] = useState('')
  const [street_line, setStreet_line] = useState('')
  const [zip_code, setZip_code] = useState('')
  const [address_ID, setAddress_ID] = useState('')
  // "State": "TestUpdate",
  //   "Street_line": "465-2473 Scelerisque St.",
  //   "Zip_code": 40575

  useEffect(() => {
    async function getData () {
      const res = await axios.get(`http://127.0.0.1:8000/customer/profile/${curId}/`)
      console.log(res.data)
      setAddress_ID(res.data.Address_ID)
    }
    getData()
  }, [curId])
  const navigate = useNavigate()
  const handleUpdate = async () => {

    console.log(state)
    console.log(street_line)
    console.log(zip_code)
    console.log(address_ID)

    const res = await axios.put(`http://127.0.0.1:8000/customer/profile/address/${address_ID}/update/`,
      {
        "State": state,
        "Street_line": street_line,
        "Zip_code": zip_code
      })
    console.log(res)
    navigate(`/${curId}/customerHome`)
  }

  return (
    <>
      <div>
        Update your address here
      </div>
      <div className='updateAddress'>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >

          <Form.Item label="State">
            <Input onChange={(e) => setState(e.target.value)} />
          </Form.Item>

          <Form.Item label="Street_line">
            <Input onChange={(e) => setStreet_line(e.target.value)} />
          </Form.Item>

          <Form.Item label="Zip_code">
            <Input onChange={(e) => setZip_code(e.target.value)} />
          </Form.Item>

          <Form.Item label="Update">
            <Button onClick={handleUpdate}>Update</Button>
          </Form.Item>


        </Form>
      </div>
    </>
  )
};

export default CustomerAddAddress