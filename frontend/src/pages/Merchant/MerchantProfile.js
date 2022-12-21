import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Form, Input, Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography

function MerchantProfile () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const curId = routeParams.id


  //请求profile数据
  const [data, setData] = useState({
    "Contact_number": "default",
    "Last_name": "default",
    "First_name": "default",
    "Password": "default",
    "Username": "default"
  })
  useEffect(() => {
    async function getData () {
      if (typeof (curId) !== "undefined") {
        const res = await axios.get(`http://127.0.0.1:8000/customer/profile/${curId}/`)
        console.log(res.data)
        setData(res.data)
      }
    }
    getData()
  }, [curId])



  //update functionality
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [contact_number, setContact_Number] = useState('')
  const [last_name, setLast_Name] = useState('')
  const [first_name, setFirst_Name] = useState('')

  const UpdateProfile = async () => {
    const res = await axios.put(`http://127.0.0.1:8000/customer/profile/${curId}/update/`,
      {
        "Contact_number": contact_number,
        "Last_name": last_name,
        "First_name": first_name,
        "Password": password,
        "Username": username
      })
    console.log(res)
    navigate(`/${curId}/customerHome`)
  }

  return (
    <>
      <div className='viewPast'>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item>
            <Title level={5}>Current Profile Information</Title>
          </Form.Item>
          <Form.Item label="First Name">
            <Title level={5}>{data.First_name}</Title>
          </Form.Item>

          <Form.Item label="Last Name">
            <Title level={5}>{data.Last_name}</Title>
          </Form.Item>

          <Form.Item label="Contact Number">
            <Title level={5}>{data.Contact_number}</Title>
          </Form.Item>

          <Form.Item label="Username">
            <Title level={5}>{data.Username}</Title>
          </Form.Item>

          <Form.Item label="Password">
            <Title level={5}>{data.Password}</Title>
          </Form.Item>

        </Form>

      </div>
      <div className='update'>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item>
            <Title level={5}>Edit info</Title>
          </Form.Item>
          <Form.Item label="First Name">
            <Input onChange={(e) => setFirst_Name(e.target.value)} />
          </Form.Item>

          <Form.Item label="Last Name">
            <Input onChange={(e) => setLast_Name(e.target.value)} />
          </Form.Item>

          <Form.Item label="Contact Number">
            <Input onChange={(e) => setContact_Number(e.target.value)} />
          </Form.Item>

          <Form.Item label="Username">
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password">
            <Input onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item label="Update">
            <Button onClick={UpdateProfile}>Update</Button>
          </Form.Item>
        </Form>

      </div>
    </>
  )
};

export default MerchantProfile