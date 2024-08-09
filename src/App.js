
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import { UserProvider } from './UserContext';
import { useEffect, useState } from 'react';
import AddProduct from './pages/AddProduct';
import Error from './pages/Error';
import Cart from './pages/Cart';
import Logout from './pages/Logout';
import ProductView from './pages/ProductView';
import OrderHistory from './pages/OrderHistory';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import './assets/css/icomoon.css';
import './App.css';

function App() {

  const [ user, setUser ] = useState({
    // access: localStorage.getItem('token')
    id: null,
    isAdmin: null,
    firstName: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
     fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
        if(data.hasOwnProperty('user')) {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin,
                firstName: data.user.firstName
            })
        } 
        else {
          setUser({
              id: null,
              isAdmin: null,
              firstName: null
          })
        }
    })
  })

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser}}>
        <Router>
        <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/myOrders" element={<OrderHistory />} />
            <Route path="/*" element={<Error />} />
          </Routes>
          </div>
        <Footer/>
        </div>
        </Router>
        
      </UserProvider>
    </>
  );
}

export default App;
