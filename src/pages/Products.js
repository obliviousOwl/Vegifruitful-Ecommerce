import { useState, useEffect, useContext } from 'react';
import UserView from '../components/UserView';
import UserContext from '../UserContext';
import AdminView from '../components/AdminView';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/pages/Products.css'

export default function Products() {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const heroStyle = {
    backgroundImage:
      "url('https://themewagon.github.io/vegefoods/images/bg_1.jpg')",
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (typeof data.products !== 'string') {
          setProducts(data.products);
          setLoading(false);
        } else {
          setProducts([]);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    let fetchUrl =
      user.isAdmin === true
        ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
        : `${process.env.REACT_APP_API_BASE_URL}/products/active`;

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
        console.log(typeof products);
      });
  });

  if (loading) {
    return (
      <div className="loading-container">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div style={heroStyle} className="hero-wrap hero-bread mb-3">
        <Container>
          <Row className="no-gutters align-items-center justify-content-center">
            <Col md={9} className="text-center">
              <h1 className="mb-0 bread text-uppercase">Products</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        {user.isAdmin ? (
          <AdminView productsData={products} fetchData={fetchData} />
        ) : (
          <UserView productsData={products} />
        )}
      </Container>
    </>
  );
}
