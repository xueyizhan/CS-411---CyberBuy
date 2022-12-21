
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LoginAdmin from './pages/Login/LoginAdmin'
import LoginCustomer from './pages/Login/LoginCustomer'
import LoginMerchant from './pages/Login/LoginMerchant'

import RegisterMerchant from './pages/Register/RegisterMerchant'
import RegisterCustomer from './pages/Register/RegisterCustomer'

import Home from '@/pages/Home/Home'
import CustomerHome from '@/pages/Customer/CustomerHome'
import CustomerRoot from './pages/Customer/CustomerRoot'
import CustomerProduct from './pages/Customer/CustomerProduct'
import CustomerOrder from './pages/Customer/CustomerOrder'
import CustomerViewProduct from './pages/Customer/CustomerViewProduct'
import CustomerAddAddress from './pages/Customer/CustomerAddAddress'
import CustomerCart from './pages/Customer/CustomerCart'
import CustomerOrderDetail from './pages/Customer/CustomerOrderDetail'
import CustomerProfile from './pages/Customer/CustomerProfile'
import CustomerSpecialOffer from './pages/Customer/CustomerSpecialOffer'

import AdminHome from './pages/Admin/AdminHome'


import MerchantHome from './pages/Merchant/MerchantHome'
import MerchantRoot from './pages/Merchant/MerchantRoot'
import MerchantProduct from './pages/Merchant/MerchantProduct'
import MerchantOrder from './pages/Merchant/MerchantOrder'
import MerchantUpdateProduct from './pages/Merchant/MerchantUpdateProduct'
import MerchantUploadProduct from './pages/Merchant/MerchantUploadProduct'
import MerchantReport from './pages/Merchant/MerchantReport'
import MerchantUpdateOrder from './pages/Merchant/MerchantUpdateOrder'
import MerchantCreateShop from './pages/Merchant/MerchantCreateShop'
import MerchantProfile from './pages/Merchant/MerchantProfile'
function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/loginCustomer" element={<LoginCustomer />} />
          <Route path="/loginMerchant" element={<LoginMerchant />} />
          <Route path="/registerMerchant" element={<RegisterMerchant />} />
          <Route path="/registerCustomer" element={<RegisterCustomer />} />



          <Route path="/:id/customerHome" element={<CustomerHome />} >
            <Route index element={<CustomerRoot />} />
            <Route path="product" element={<CustomerProduct />} />
            <Route path="order" element={<CustomerOrder />} />
            <Route path="orderdetail/:orderid" element={<CustomerOrderDetail />} />
            <Route path="viewProduct/:productid/:producttype" element={<CustomerViewProduct />} />
            <Route path="addAddress" element={<CustomerAddAddress />} />
            <Route path="cart" element={<CustomerCart />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="specialOffer" element={<CustomerSpecialOffer />} />
          </Route>

          <Route path="/:id/merchantHome" element={<MerchantHome />}>
            <Route index element={<MerchantRoot />} />
            <Route path="product" element={<MerchantProduct />} />

            <Route path="updateProduct/:productId" element={<MerchantUpdateProduct />} />
            <Route path="uploadProduct" element={<MerchantUploadProduct />} />
            <Route path="order" element={<MerchantOrder />} />
            <Route path="updateOrder/:orderId" element={<MerchantUpdateOrder />} />
            <Route path="report" element={<MerchantReport />} />
            <Route path="createShop" element={< MerchantCreateShop />} />
            <Route path="profile" element={<MerchantProfile />} />
          </Route>

          <Route path="/:id/adminHome" element={<AdminHome />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
