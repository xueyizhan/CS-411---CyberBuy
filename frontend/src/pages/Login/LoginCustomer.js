import { Card, Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function LoginCustomer () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const getEmail = (e) => {
    setEmail(e.target.value)
    //console.log(e.target.value)
  }

  const getPassward = (e) => {
    setPassword(e.target.value)
    //console.log(e.target.value)
  }


  const navigate = useNavigate()
  //点击login
  const onFinish = async () => {

    console.log(email)
    console.log(password)


    //前端测试用id 地址传参 
    //var id = '6249'
    //console.log('Success')

    const res = await axios.put("http://127.0.0.1:8000/auth/login/customer",
      {
        "email": email,
        "password": password
      })
    console.log(res)
    if (typeof (res.data) === 'number') {
      navigate(`/${res.data}/customerHome`)
    }
    else
      onFinishFailed()

  }
  //login失败 
  const [isFail, setIsFail] = useState('default')
  function Fail () {
    if (isFail === 'true')
      return (
        <div>incorrect email or password!</div>
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



  const ToRegister = () => {
    navigate('/registerCustomer')
  }

  return (
    <div className='login'>
      <Card className='login-container'>
        <div>Welcome back, Merchant</div>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input onChange={getEmail} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={getPassward} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Fail />

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" onClick={ToRegister}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginCustomer