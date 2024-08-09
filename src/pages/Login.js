import { Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
// import '../assets/css/Login.css'

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  function authenticate(e) {
    e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
                email: email,
            	password: password
			})
		})
        .then(res => res.json())
        .then(data => {
            if(data.error === 'No Email Found') {
                Swal.fire({
                    title: 'No email found',
                    icon: 'error',
                    text: 'Email does not exist.'
                })
            }
            else if(typeof data.access !== "undefined") {

                localStorage.setItem('token', data.access)
                getUserDetails(localStorage.getItem('token'));
                Swal.fire({
                    title: 'Login Successful',
                    icon: 'success',
                    text: 'Welcome'
                })
                navigate('/')
            }
            else {
                Swal.fire({
                    title: 'Authentication failed',
                    icon: 'error',
                    text: 'Check your login details and try again.'
                })
            }
        })
    }

    const getUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin,
                firstName: data.user.firstName
            })
        })

    }


    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== '') {

            setIsActive(true);

        } else {

            setIsActive(false);
        }

    }, [email, password]);


  return (
    user.id !== null ?
        <Navigate to={'/'} />
    :
    <Container>
    <h1 className="text-center my-5">Login to VegiFruitful</h1>
    <Row className="justify-content-center align-items-center">
      <Col xs={12} md={6} lg={4}>
        <div className="p-4">
          <Form onSubmit={(e) => authenticate(e)}>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderRadius: '0' }}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: '0' }}
              />
            </FloatingLabel>

            <div className="text-center">
              
                <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive} style={{ borderRadius: '0' }}>
                  Login
                </Button>
              </div>
          </Form>
        </div>
      </Col>
    </Row>
  </Container>
  );
}
