import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import CartCard from '../components/CartCard';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/pages/Cart.css'

export default function Cart() {
  const { user } = useContext(UserContext);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const heroStyle = {
    backgroundImage:
      "url('https://themewagon.github.io/vegefoods/images/bg_1.jpg')",
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.cart.cartItems) {
          setLoading(false);
          setCart(data.cart);
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <span>Loading...</span>
      </div>
    );
  }

  if (error)
    return user.isAdmin ? (
      <Navigate to={'/products'} />
    ) : (
      <div>Cart is Empty</div>
    );

  return (
    <>
      <div style={heroStyle} className="hero-wrap hero-bread mb-3">
        <Container>
          <Row className="no-gutters align-items-center justify-content-center">
            <Col md={9} className="text-center">
              <h1 className="mb-0 bread text-uppercase">Cart</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        {user.isAdmin ? (
          <Navigate to={'/products'} />
        ) : (
          <CartCard cartData={cart} />
        )}
      </Container>
    </>
  );
}
