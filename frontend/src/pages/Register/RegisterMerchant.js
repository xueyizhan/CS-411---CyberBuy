import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './index.scss'
function RegisterMerchant () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  console.log(email)
  console.log(username)
  console.log(password)
  //点击login
  const handleRegister = async () => {

    console.log(email)
    console.log(username)
    console.log(password)


    const res = await axios.post("http://127.0.0.1:8000/auth/register/merchant",
      {
        "email": email,
        "username": username,
        "password": password
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

        <Fail />

        <Form.Item label="Register">
          <Button onClick={handleRegister}>Register</Button>
        </Form.Item>


      </Form>
    </div>

  )
};

export default RegisterMerchant