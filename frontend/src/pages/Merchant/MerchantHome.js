import { Col, Row, Button, Divider } from 'antd'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import './index.scss'

function MerchantHome () {

  const routeParams = useParams()
  const curId = routeParams.id
  //console.log(curId)


  const navigate = useNavigate()

  const toHome = () => {
    navigate(`/${curId}/merchantHome`)
  }
  const toProduct = () => {
    navigate(`/${curId}/merchantHome/product`)
  }
  const toProfile = () => {
    navigate(`/${curId}/merchantHome/profile`)
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

export default MerchantHome