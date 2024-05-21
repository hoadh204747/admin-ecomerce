import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style/dark.scss'
import './App.css';
import Home from './pages/Home/Home';
import LoginSignup from './pages/LoginSignup/LoginSignup';
import AddProduct from './pages/AddProduct/AddProduct';
import Brand from './pages/Brands/Brand';
import ListUser from './pages/ListUser/ListUser';
import ListProduct from './pages/ListProduct/ListProduct';
import NewAttribute from './pages/NewAttribute/NewAttribute';
import Orders from './pages/Orders/Orders';
import EditProduct from './pages/EditProduct/EditProduct';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>} />
            <Route path='login' element={<LoginSignup />} />
            <Route path="users">
              <Route index element={<ListUser />} />
            </Route>
            <Route path="products">
              <Route index element={<ListProduct />} />
              <Route
                path="add-product"
                element={<AddProduct />}
              />
              <Route
                path="brands"
                element={<Brand />}
              />
              <Route
                path='attribute'
                element={<NewAttribute/>}
              />
              <Route
                path='edit/:productId'
                element={<EditProduct/>}
              />
            </Route>
            <Route path='orders' element={<Orders/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
