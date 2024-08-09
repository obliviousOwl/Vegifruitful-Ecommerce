import { useContext } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';
import '../assets/css/components/AppNavbar.css';

export default function AppNavbar() {

    const { user } = useContext(UserContext);
	
	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light">
		<div className="container">
			<Navbar.Brand as={Link} to="/" className='navbar-brand' href="index.html">VegiFruitful</Navbar.Brand>
			<Navbar.Toggle aria-controls="ftco-nav">
				<span className="oi oi-menu"></span> Menu
			</Navbar.Toggle>
			<Navbar.Collapse id="ftco-nav">
				<Nav className="ms-auto">
					<li className="nav-item">
						<Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
					</li>
					{
						user.id !== null ?
							<>
								{
									user.isAdmin ?
										<>
											<li className="nav-item">
												<Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>
											</li>
											<NavDropdown title="Admin" id="basic-nav-dropdown">
												<NavDropdown.Item as={Link} to="/addProduct" className='text-dark'>Add Product</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item as={NavLink} className='text-dark' to="/logout" exact="true">Logout</NavDropdown.Item>
											</NavDropdown>
										</>
										:
										<>
											<li className="nav-item">
												<Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>
											</li>
											<NavDropdown title={`Hello ${user.firstName}`} id="basic-nav-dropdown">
												<NavDropdown.Item as={NavLink} to="/cart">Cart</NavDropdown.Item>
												<NavDropdown.Item as={NavLink} to="/myOrders">My Orders</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item as={NavLink} to="/logout" exact="true">Logout</NavDropdown.Item>
											</NavDropdown>
										</>
								}
							</>
							:
							<>
								<li className="nav-item">
									<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
								</li>
								<li className="nav-item">
									<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
								</li>
							</>
					}
				</Nav>
			</Navbar.Collapse>
		</div>
	</Navbar>
    );
}