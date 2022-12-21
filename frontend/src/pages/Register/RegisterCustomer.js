import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './index.scss'
function RegisterCustomer () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [contact_number, setContact_Number] = useState('')
  const [last_name, setLast_Name] = useState('')
  const [first_name, setFirst_Name] = useState('')
  const navigate = useNavigate()
  console.log(email)
  console.log(username)
  console.log(password)
  //点击login
  const handleRegister = async () => {

    console.log(email)
    console.log(username)
    console.log(password)
    console.log(contact_number)
    console.log(last_name)
    console.log(first_name)

    const res = await axios.post("http://127.0.0.1:8000/auth/register/customer",
      {
        "username": username,
        "email": email,
        "contact_number": contact_number,
        "password": password,
        "last_name": last_name,
        "first_name": first_name

      })
    console.log(res)
    if (res.data === "The email has been used!") {
      onFinishFailed()
    }
    else
      navigate(`/`)
  }

  //register失败 
  const [isFail, setIsFail] = useState('default')
  function Fail () {
    if (isFail === 'true')
      return (
        <div>"The email has been used!"</div>
      )
    else
      return (
        <div></div>
      )
  }
  const onFinishFailed = () => {
    setIsFail('true')
    console.log('Failed')
  }

  return (
    <div className='register'>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >

        <Form.Item label="Email">
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item label="Username">
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item label="Password">
          <Input onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item label="Contact Number">
          <Input onChange={(e) => setContact_Number(e.target.value)} />
        </Form.Item>

        <Form.Item label="First Name">
          <Input onChange={(e) => setFirst_Name(e.target.value)} />
        </Form.Item>


        <Form.Item label="Last Name">
          <Input onChange={(e) => setLast_Name(e.target.value)} />
        </Form.Item>

        <Fail />

        <Form.Item label="Register">
          <Button onClick={handleRegister}>Register</Button>
        </Form.Item>


      </Form>
    </div>

  )
};

export default RegisterCustomer