import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Form, Input, Button, Select, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography

function MerchantUpdateProduct () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const curId = routeParams.id
  const productId = routeParams.productId
  //console.log(curId, productId)

  //开始时请求shopid 
  const [shopId, setShopId] = useState()

  useEffect(() => {
    async function getShopId () {
      const res = await axios.get(`http://127.0.0.1:8000/merchant/${curId}/shop/`)
      console.log(res.data.Shop_ID)
      setShopId(res.data.Shop_ID)

    }
    getShopId()
  }, [curId])

  //请求product数据
  const [productData, setProductData] = useState({
    Title: "default",
    Product_Type: "default",
    Price: "default",
    Stock: "default"
  })
  useEffect(() => {
    async function getOneProduct () {
      if (typeof (shopId) !== "undefined") {
        const res = await axios.get(`http://127.0.0.1:8000/merchant/shop/${shopId}/products/${productId}/`)
        console.log(res.data)
        setProductData(res.data)
      }
    }
    getOneProduct()
  }, [shopId, productId])
  //条件请求数据
  const [pastData, setPastData] = useState({
    Product_ID: 0,
    RAM: "default",
    Size: 0,
    Storages: "default",
    Color: "default",
    Game_Platform: "default"

  })

  useEffect(() => {
    async function getInfoFromType () {
      if (typeof (shopId) !== "undefined") {
        console.log("getItem")
        if (productData.Product_Type === "Computer") {
          const res = await axios.get(`http://127.0.0.1:8000/merchant/shop/products/${productId}/computer/description/`)
          console.log("computer", res.data)
          setPastData(res.data)
        }
        else if (productData.Product_Type === "Cellphone") {
          const res = await axios.get(`http://127.0.0.1:8000/merchant/shop/products/${productId}/cellphone/description/`)
          console.log(res)
          setPastData(res.data)
        }
        else if (productData.Product_Type === "Videogame") {
          const res = await axios.get(`http://127.0.0.1:8000/merchant/shop/products/${productId}/videogame/description/`)
          console.log(res)
          setPastData(res.data)
        }
      }
    }
    getInfoFromType()
  }, [productId, productData, shopId])
  //update functionality
  //basic
  const [name, setName] = useState()
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  // console.log('name:', name)
  // console.log('price:', price)
  // console.log('stock:', stock)

  //special params of computer
  //storage, ram, screen size
  const [computerStorage, setComputerStorage] = useState()
  const [ram, setRam] = useState()
  const [screenSize, setScreenSize] = useState()

  const handleComputerStorageChange = (value) => {
    setComputerStorage(value)
  }
  const handleRamChange = (value) => {
    setRam(value)
  }
  const handleScreenSizeChange = (value) => {
    setScreenSize(value)
  }
  // console.log("computer storage:" + computerStorage)
  // console.log("ram:" + ram)
  // console.log("screenSize:" + screenSize)

  //special params of cellphone
  //storage, color
  const [cellphoneStorage, setCellphoneStorage] = useState()
  const [color, setColor] = useState()
  const handleCellphoneStorageChange = (value) => {
    setCellphoneStorage(value)
  }
  const handleColorChange = (value) => {
    setColor(value)
  }
  // console.log("cell phone storage:" + cellphoneStorage)
  // console.log("color:" + color)


  //videogame
  const [platform, setPlatform] = useState()
  const handlePlatformChange = (value) => {
    setPlatform(value)
  }
  // console.log("platform:" + platform)

  /*条件调用api完成更新*/
  const UpdateProduct = async () => {
    await axios.put(`http://127.0.0.1:8000/merchant/shop/${shopId}/products/${productId}/update/`,
      {
        "product_id": productId,
        "title": name,
        "stock": stock,
        "price": price,
        "product_type": productData.Product_Type,
        "brand_name": productData.Brand_Name,
        "shop": shopId
      })
    if (productData.Product_Type === "Computer") {
      console.log("Computer API")
      await axios.put(`http://127.0.0.1:8000/merchant/shop/products/${productId}/computer/description/update/`, {
        "product_id": productId,
        "ram": ram,
        "storages": computerStorage,
        "size": screenSize
      })
    }

    else if (productData.Product_Type === "Cellphone") {
      console.log("Cellphone API")
      await axios.put(`http://127.0.0.1:8000/merchant/shop/products/${productId}/cellphone/description/update/`, {
        "product_id": productId,
        "storages": cellphoneStorage,
        "color": color
      })
    }

    else {
      console.log("Videogame API",)
      await axios.put(`http://127.0.0.1:8000/merchant/shop/products/${productId}/videogame/description/update/`, {
        "product_id": productId,
        "game_platform": platform
      })
    }
    navigate(`/${curId}/merchantHome/product`)

  }

  return (
    <>
      <div className='viewPast'>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item>
            <Title level={5}>Last info of product</Title>
          </Form.Item>
          <Form.Item label="Product Name">
            <Title level={5}>{productData.Title}</Title>
          </Form.Item>

          <Form.Item label="Product Type">
            <Title level={5}>{productData.Product_Type}</Title>
          </Form.Item>

          <Form.Item label="Price">
            <Title level={5}>{productData.Price}</Title>
          </Form.Item>


          <Form.Item label="Stock">
            <Title level={5}>{productData.Stock}</Title>
          </Form.Item>

          {/* conditional render*/}
          {productData.Product_Type === "Default" ? <div /> :
            productData.Product_Type === "Computer" ?
              <>
                <Form.Item label="Storage">
                  <Title level={5}>{pastData.Storages}</Title>
                </Form.Item>
                <Form.Item label="RAM">
                  <Title level={5}>{pastData.RAM}</Title>
                </Form.Item>
                <Form.Item label="Screen Size">
                  <Title level={5}>{pastData.Size}</Title>
                </Form.Item>
              </>
              : productData.Product_Type === "Cellphone" ?
                <>
                  <Form.Item label="Storage">
                    <Title level={5}>{pastData.Storages}</Title>
                  </Form.Item>
                  <Form.Item label="Color">
                    <Title level={5}>{pastData.Color}</Title>
                  </Form.Item>
                </>
                : productData.Product_Type === "Videogame" ?
                  <Form.Item label="Platform">
                    <Title level={5}>{pastData.Game_Platform}</Title>
                  </Form.Item>
                  : <div />}

        </Form>

      </div>
      <div className='update'>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item>
            <Title level={5}>Edit info</Title>
          </Form.Item>
          <Form.Item label="Product Name">
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Price">
            <Input onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>


          <Form.Item label="Stock">
            <Input onChange={(e) => setStock(e.target.value)} />
          </Form.Item>

          {/* conditional render*/}
          {productData.Product_Type === "Default" ? <div /> :
            productData.Product_Type === "Computer" ?
              <>
                <Form.Item label="Storage">
                  <Select onChange={handleComputerStorageChange}>
                    <Select.Option value="256 GB">256 GB</Select.Option>
                    <Select.Option value="512 GB">512 GB</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="RAM">
                  <Select onChange={handleRamChange}>
                    <Select.Option value="8 GB">8 GB</Select.Option>
                    <Select.Option value="16 GB">16 GB</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Screen Size">
                  <Select onChange={handleScreenSizeChange}>
                    <Select.Option value={13.3}>13.3</Select.Option>
                    <Select.Option value={15.6}>15.6</Select.Option>
                    <Select.Option value={17}>17</Select.Option>
                  </Select>
                </Form.Item>
              </>
              : productData.Product_Type === "Cellphone" ?
                <>
                  <Form.Item label="Storage">
                    <Select onChange={handleCellphoneStorageChange}>
                      <Select.Option value="64 GB">64 GB</Select.Option>
                      <Select.Option value="128 GB">128 GB</Select.Option>
                      <Select.Option value="256 GB">256 GB</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Color">
                    <Select onChange={handleColorChange}>
                      <Select.Option value="Obsidian">Obsidian</Select.Option>
                      <Select.Option value="Deep Purple">Deep Purple</Select.Option>
                      <Select.Option value="Gold">Gold</Select.Option>
                    </Select>
                  </Form.Item>
                </>
                : productData.Product_Type === "Videogame" ?
                  <Form.Item label="Platform">
                    <Select onChange={handlePlatformChange}>
                      <Select.Option value="Nintendo Switch">Nintendo Switch</Select.Option>
                      <Select.Option value="PlayStation 5">PlayStation 5</Select.Option>
                      <Select.Option value="Xbox Series X">Xbox Series X</Select.Option>
                    </Select>
                  </Form.Item>
                  : <div />}




          <Form.Item label="Update">
            <Button onClick={UpdateProduct}>Update</Button>
          </Form.Item>
        </Form>

      </div>
    </>
  )
};

export default MerchantUpdateProduct