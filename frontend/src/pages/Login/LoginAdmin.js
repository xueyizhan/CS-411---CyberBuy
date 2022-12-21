import { Card, Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'


function LoginAdmin () {
  const [usename, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const getUsername = (e) => {
    setUsername(e.target.value)
    //console.log(e.target.value)
  }

  const getPassward = (e) => {
    setPassword(e.target.value)
    //console.log(e.target.value)
  }


  const navigate = useNavigate()
  //点击login
  const onFinish = () => {

    console.log(usename)
    console.log(password)
    //前端单独识别id 是否为admin，成功则直接跳转到admin页面


    if (usename === 'admin' && password === 'admin')
      navigate('/admin/adminHome')
    //请求后端识别id，返回是否为customer id或者merchant id
    else {
      onFinishFailed()
    }

  }
  //login失败 
  const onFinishFailed = () => {
    console.log('Failed')
  }




  return (
    <div className='login'>

      <Card className='login-container'>
        <div>Welcome back, Admin</div>
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
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input onChange={getUsername} />
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

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>


        </Form>
      </Card>
    </div>
  )
};

export default LoginAdmin