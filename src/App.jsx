//React Architecture
import { Route, Routes } from "react-router-dom"
import { ConfigProvider, CitiesProvider } from "./contextReducers"
//Pages / Views
import Main from "./Pages/Main"
import Manage from "./Pages/Manage/"
import "./Index.scss"
// components //
import Layout from "./Components/Layout"
//Containers
import ModalContainer from './Components/Modal'
import { ToastContainer } from "react-tiny-toast"
/*
* Weather App By:
* Yuval Dikerman
* 3dyuval@gmail.com
*/


export default function App() {


  return (
    <ConfigProvider>
      <CitiesProvider>
        <ToastContainer />
        <ModalContainer />
        <Layout >
          <Routes>
            <Route path="/">
              <Route index element={<Main />} />
              <Route path='weather/:city' element={<Main />} />
              <Route path="manage" element={<Manage />} />
            </Route>
          </Routes>
        </Layout>
      </CitiesProvider>
    </ConfigProvider>

  )
}


