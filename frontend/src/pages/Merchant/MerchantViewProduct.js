import { Form, Typography } from "antd"
import { useState } from "react"


const { Title } = Typography

function MerchantViewProduct () {
  const [type, settype] = useState("default")
  return (
    <div className='view'>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >

        <Form.Item label="Product Name">
          <Title level={5}>h3. Ant Design</Title>
        </Form.Item>

        <Form.Item label="Price">
          <Title level={5}>h3. Ant Design</Title>
        </Form.Item>


        <Form.Item label="Stock">
          <Title level={5}>h3. Ant Design</Title>
        </Form.Item>

        {/* conditional render*/}
        {type === "Default" ? <div /> :
          type === "Computer" ?
            <>
              <Form.Item label="Storage">
                <Title level={5}>h3. Ant Design</Title>
              </Form.Item>
              <Form.Item label="RAM">
                <Title level={5}>h3. Ant Design</Title>
              </Form.Item>
              <Form.Item label="Screen Size">
                <Title level={5}>h3. Ant Design</Title>
              </Form.Item>
            </>
            : type === "Cellphone" ?
              <>
                <Form.Item label="Storage">
                  <Title level={5}>h3. Ant Design</Title>
                </Form.Item>
                <Form.Item label="Color">
                  <Title level={5}>h3. Ant Design</Title>
                </Form.Item>
              </>
              : type === "Videogame" ?
                <Form.Item label="Platform">
                  <Title level={5}>h3. Ant Design</Title>
                </Form.Item>
                : <div />}

      </Form>

    </div>
  )
}
export default MerchantViewProduct