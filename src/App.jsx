import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ConfigProvider, CitiesProvider } from "./contextReducers"
//Pages / Views
import Main from "./Pages/Main"
import Manage from "./Pages/Manage/"
// components //
import Header from "./Components/Header/Header"
import NavBar from "./Components/Header/NavBar"
import Modal from "./Components/Modal/Modal"
import Configuration from "./Components/UserConfiguration/"
import "./Index.scss"
import { ToastContainer } from "react-tiny-toast"
/*
* Weather App By:
* Yuval Dikerman
* 3dyuval@gmail.com
*/

export default function App() {

  // const [firstVisit, setFirstVisit] = useState(false)
  // if (firstVisit) return (
  //   <ConfigProvider>
  //     <Homepage setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
  //   </ConfigProvider>
  // )

  return (
    <Router>
      <ConfigProvider>
        <CitiesProvider>
          <div className="app">
            <ToastContainer />
            <Header>
              <NavBar />
            </Header>
            <Routes>
              <Route exact path='/' element={<Main />} />
              <Route path='/:city' element={<Main />} />
              <Route path="/manage/"
                element={<Manage />}>
                <Route path="/manage/configuration"
                  element={<Modal ><Configuration /></Modal>} />
              </Route>
            </Routes>
          </div>
        </CitiesProvider>
      </ConfigProvider>
    </Router>

  )
}


