import { Col, Row, Button } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import './index.scss'

function CustomerRoot () {
  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)


  const navigate = useNavigate()
  const toOrder = () => {
    navigate(`/${curId}/customerHome/order`)
  }
  const toProduct = () => {
    navigate(`/${curId}/customerHome/product`)
  }
  const toCart = () => {
    navigate(`/${curId}/customerHome/cart`)
  }
  const addAddress = () => {
    navigate(`/${curId}/customerHome/addAddress`)
  }
  const toSpecialOffer = () => {
    navigate(`/${curId}/customerHome/specialOffer`)
  }
  return (
    <>
      <Row className="root" gutter={[16, 24]}>
        <Col className="gutter-row" span={10}>
          <Button type="primary" onClick={toOrder}>View Orders</Button>
        </Col>
        <Col className="gutter-row" span={10}>
          <Button type="primary" onClick={toProduct}>View Products</Button>
        </Col>
        <Col className="gutter-row" span={10}>
          <Button type="primary" onClick={toCart}>Cart</Button>
        </Col>
        <Col className="gutter-row" span={10}>
          <Button type="primary" onClick={addAddress}>Update address</Button>
        </Col>
        <Col className="gutter-row" span={10}>
          <Button type="primary" onClick={toSpecialOffer}>View my special offer</Button>
        </Col>
      </Row>
    </>
  )
};

export default CustomerRoot