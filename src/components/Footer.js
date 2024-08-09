import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {

    return (
        <>
            <footer className="footer bg-dark text-white py-3">
                <Container>
                    <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>
                        We are a company committed to providing the best services to our customers.
                        Our goal is to achieve customer satisfaction through excellence.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                        <li><a href="#home" className="text-white">Home</a></li>
                        <li><a href="#services" className="text-white">Services</a></li>
                        <li><a href="#about" className="text-white">About</a></li>
                        <li><a href="#contact" className="text-white">Contact</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <address>
                        1234 Street Name, City<br />
                        State, Country<br />
                        <a href="mailto:info@company.com" className="text-white">info@company.com</a><br />
                        <a href="tel:+1234567890" className="text-white">+123 456 7890</a>
                        </address>
                    </Col>
                    </Row>
                    <Row>
                    <Col className="text-center mt-3">
                        <p>Copyright &copy; {new Date().getFullYear()} All rights reserved.</p>
                    </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}