import { Col, Row, Button, Divider } from 'antd'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import './index.scss'

function CustomerHome () {

  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)


  const navigate = useNavigate()

  const toHome = () => {
    navigate(`/${curId}/customerHome`)
  }
  const toProduct = () => {
    navigate(`/${curId}/customerHome/product`)
  }
  const toProfile = () => {
    navigate(`/${curId}/customerHome/profile`)
  }
  const toAboutus = () => {

  }
  const toContactus = () => {

  }

  const signOut = () => {
    navigate('/')
  }

  return (
    <>
      <Row gutter={0}>
        <Col>
          <Button onClick={toHome}>Home</Button>
        </Col>
        <Col>
          <Button onClick={toProduct}>Product</Button>
        </Col>
        <Col>
          <Button onClick={toProfile}>Profile</Button>
        </Col>
        <Col>
          <Button onClick={toAboutus}>About us</Button>
        </Col>
        <Col>
          <Button onClick={toContactus}>Contact us</Button>
        </Col>
        <Col>
          <Button onClick={signOut}>Sign Out</Button>
        </Col>

      </Row>
      <Divider orientation="left"></Divider>

      <Outlet />



    </>
  )
};

export default CustomerHome