import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function MerchantUploadProduct () {
  const navigate = useNavigate()
  //get shop id and shop name
  const routeParams = useParams()
  const curId = routeParams.id
  console.log(curId)

  const [shopId, setShopId] = useState()
  const [shopName, setShopName] = useState()

  useEffect(() => {
    async function getShopId () {

      const res = await axios.get(`http://127.0.0.1:8000/merchant/${curId}/shop/`)
      console.log(res.data)
      console.log(res.data.Shop_ID)
      setShopId(res.data.Shop_ID)
      console.log(res.data.Shop_Name)
      setShopName(res.data.Shop_Name)

    }
    getShopId()
  }, [curId])


  //public params
  const [name, setName] = useState()
  const [type, settype] = useState("default")
  const [price, setPrice] = useState()
  const [stock, setStock] = useState()

  console.log("name:" + name)
  console.log("type:" + type)
  console.log("price:" + price)
  console.log("stock:" + stock)


  const handleTypeChange = (value) => {
    settype(value)
  }


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
  console.log("computer storage:" + computerStorage)
  console.log("ram:" + ram)
  console.log("screenSize:" + screenSize)


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
  console.log("cell phone storage:" + cellphoneStorage)
  console.log("color:" + color)


  //videogame
  const [platform, setPlatform] = useState()
  const handlePlatformChange = (value) => {
    setPlatform(value)
  }
  console.log("platform:" + platform)

  /*条件调用api完成上传*/
  const handleUpload = async () => {
    const res = await axios.post(`http://127.0.0.1:8000/merchant/shop/${shopId}/products/productItem/create/`,
      {
        "title": name,
        "stock": stock,
        "price": price,
        "product_type": type,
        "brand_name": shopName,
      })
    console.log(res.data)
    if (type === "Computer") {
      console.log("Upload Computer")

      await axios.post(`http://127.0.0.1:8000/merchant/shop/products/computerItem/${res.data}/description/create/`,
        {
          "ram": ram,
          "storages": computerStorage,
          "size": screenSize
        })
    }
    else if (type === "Cellphone") {
      console.log("Upload Cellphone")
      await axios.post(`http://127.0.0.1:8000/merchant/shop/products/cellphoneItem/${res.data}/description/create/`,
        {
          "storages": cellphoneStorage,
          "color": color
        })

    }
    else {
      console.log("Upload Videogame")
      await axios.post(`http://127.0.0.1:8000//merchant/shop/products/videogameItem/${res.data}/description/create/`,
        {
          "game_platform": platform

        })

    }
    navigate(`/${curId}/merchantHome/product`)
  }

  return (
    <div className='upload'>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >


        <Form.Item label="Product Name">
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item label="Product Type">
          <Select onChange={handleTypeChange}>
            <Select.Option value="Computer">Computer</Select.Option>
            <Select.Option value="Cellphone">Cellphone</Select.Option>
            <Select.Option value="Videogame">Videogame</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Price">
          <Input onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>

        <Form.Item label="Stock">
          <Input onChange={(e) => setStock(e.target.value)} />
        </Form.Item>
        {/* conditional render*/}
        {type === "default" ?
          <div />
          : type === "Computer" ?
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
            : type === "Cellphone" ?
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
              : type === "Videogame" ?
                <Form.Item label="Platform">
                  <Select onChange={handlePlatformChange}>
                    <Select.Option value="Nintendo Switch">Nintendo Switch</Select.Option>
                    <Select.Option value="PlayStation 5">PlayStation 5</Select.Option>
                    <Select.Option value="Xbox Series X">Xbox Series X</Select.Option>
                  </Select>
                </Form.Item>
                : <div />}




        <Form.Item label="Upload">
          <Button onClick={handleUpload}>Upload</Button>
        </Form.Item>
      </Form>

    </div>

  )
};

export default MerchantUploadProduct