import { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

	const { user } = useContext(UserContext);

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ mobileNo, setMobileNo ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ isActive, setIsActive ] = useState(false);

    function registerUser(e) {
        e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.error === 'Email Invalid'){
				Swal.fire({
					title: "Invalid Email?",
					text: "Please check your email",
					icon: "error"
				})
			}
			else if(data.error === 'Mobile number invalid'){
				Swal.fire({
					title: "Invalid Mobile Number?",
					text: "Please check your Mobile Number",
					icon: "error"
				})
			}
			else if(data.error === 'Password must be atleast 8 characters long'){
				Swal.fire({
					title: "Password must be atleast 8 characters long",
					text: "Please check your password",
					icon: "error"
				})
			}
			else if(data.message === 'Registered Successfully'){
				Swal.fire({
					title: "Success",
					text: "Registration has been successful",
					icon: "success"
				})
			}
			else{
				Swal.fire({
					title: "Something went wrong",
					text: "Error in registration",
					icon: "error"
				})
			}
		})
    }

    useEffect(() => {

		if((firstName !== "" && lastName !== "" && mobileNo !== "" && email !== "" && password !== "" && confirmPassword !== "") && (mobileNo.length === 11) && (password === confirmPassword)) {

			setIsActive(true);

		} else {

			setIsActive(false);
		}
	}, [firstName, lastName, email, mobileNo, password, confirmPassword])

	return (
		user.id ?
		<Navigate to={'/'}/>
		:
		<Container>
		<Row className="justify-content-center">
		  <Col xs={12} sm={8} md={6} lg={4}>
			<Form className="my-5" onSubmit={(e) => registerUser(e)}>
			  <h1 className="my-5 text-center">Register</h1>
  
			  <Form.Group className="mb-3">
				<Form.Label>First Name:</Form.Label>
				<Form.Control
				  type="text"
				  placeholder="Enter First Name"
				  value={firstName}
				  onChange={(e) => setFirstName(e.target.value)}
				  required
				  className="form-control"
				/>
			  </Form.Group>
  
			  <Form.Group className="mb-3">
				<Form.Label>Last Name:</Form.Label>
				<Form.Control
				  type="text"
				  placeholder="Enter Last Name"
				  value={lastName}
				  onChange={(e) => setLastName(e.target.value)}
				  required
				  className="form-control"
				/>
			  </Form.Group>
  
			  <Form.Group className="mb-3">
				<Form.Label>Email:</Form.Label>
				<Form.Control
				  type="email"
				  placeholder="Enter Email"
				  value={email}
				  onChange={(e) => setEmail(e.target.value)}
				  required
				  className="form-control"
				/>
			  </Form.Group>
  
			  <Form.Group className="mb-3">
				<Form.Label>Mobile No:</Form.Label>
				<Form.Control
				  type="text"
				  placeholder="Enter 11 Digit Mobile No"
				  value={mobileNo}
				  onChange={(e) => setMobileNo(e.target.value)}
				  required
				  className="form-control"
				/>
			  </Form.Group>
  
			  <Form.Group className="mb-3">
				<Form.Label>Password:</Form.Label>
				<Form.Control
				  type="password"
				  placeholder="Enter Password"
				  value={password}
				  onChange={(e) => setPassword(e.target.value)}
				  required
				  className="form-control"
				/>
			  </Form.Group>
  
			  <Form.Group className="mb-3">
				<Form.Label>Confirm Password:</Form.Label>
				<Form.Control
				  type="password"
				  placeholder="Confirm Password"
				  value={confirmPassword}
				  onChange={(e) => setConfirmPassword(e.target.value)}
				  required
				  className="form-control"
				/>
			  </Form.Group>
  
			  <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive} className="d-block mx-auto">
				Submit
			  </Button>
			</Form>
		  </Col>
		</Row>
	  </Container>
	  );
}