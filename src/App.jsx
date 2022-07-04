import { Route, Routes } from "react-router-dom"
import { ConfigProvider, CitiesProvider } from "./contextReducers"
import Main from "./Pages/Main"
import Manage from "./Pages/Manage/"
import "./Index.scss"
import Layout from "./Components/Layout"
import ModalContainer from './Components/Modal'
import { ToastContainer } from "react-tiny-toast"

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


