import { Col, Row, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.scss'
//复用模板
function Home () {
  const navigate = useNavigate()

  const toHome = () => {
    navigate('/')
  }
  const toProduct = () => {

  }
  const toAboutus = () => {

  }
  const toContactus = () => {

  }
  const toAdminLogin = () => {
    navigate('/loginAdmin')
  }
  const toMerchantLogin = () => {
    navigate('/loginMerchant')
  }
  const toCustomerLogin = () => {
    navigate('/loginCustomer')
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
          <Button onClick={toAboutus}>About us</Button>
        </Col>
        <Col>
          <Button onClick={toContactus}>Contact us</Button>
        </Col>
      </Row>
      <Row className="offsetHomeButton" gutter={[16, 24]}>
        <Col className="gutter-row" span={12}>
          <Button type="primary" onClick={toAdminLogin}>I am admin</Button>
        </Col>
        <Col className="gutter-row" span={12}>
          <Button type="primary" onClick={toMerchantLogin}>I am merchant</Button>
        </Col>
        <Col className="gutter-row" span={24}>
          <Button type="primary" onClick={toCustomerLogin}>I am customer</Button>
        </Col>
      </Row>

    </>
  )
};

export default Home