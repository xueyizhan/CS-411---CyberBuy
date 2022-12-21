import { Col, Row, Button } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import './index.scss'

function MerchantRoot () {
  const routeParams = useParams()
  const curId = routeParams.id
  //console.log(curId)


  const navigate = useNavigate()
  const toOrder = () => {
    navigate(`/${curId}/merchantHome/order`)
  }
  const toProduct = () => {
    navigate(`/${curId}/merchantHome/product`)
  }
  const toUpload = () => {
    navigate(`/${curId}/merchantHome/uploadProduct`)
  }
  const toReport = () => {
    navigate(`/${curId}/merchantHome/report`)
  }
  const toCreateShop = () => {
    navigate(`/${curId}/merchantHome/createShop`)
  }
  return (
    <>
      <Row className="offsetMerHome" gutter={[16, 24]}>
        <Col className="gutter-row" span={12}>
          <Button type="primary" onClick={toOrder}>View Orders</Button>
        </Col>
        <Col className="gutter-row" span={12}>
          <Button type="primary" onClick={toProduct}>View Products</Button>
        </Col>
        <Col className="gutter-row" span={12}>
          <Button type="primary" onClick={toUpload}>Upload Product</Button>
        </Col>
        <Col className="gutter-row" span={12}>
          <Button type="primary" onClick={toReport}>View Your Report!</Button>
        </Col>
        <Col className="gutter-row" span={12}>
          <Button type="primary" onClick={toCreateShop}>First Step: Create Your Shop!</Button>
        </Col>
      </Row>
    </>
  )
};

export default MerchantRoot