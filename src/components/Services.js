import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Services() {
    return (
        <section id="services">
            <div className="container">
                <Row>
                    <Col md={3}>
                        <div className="service-item">Service 1</div>
                    </Col>
                    <Col md={3}>
                        <div className="service-item">Service 2</div>
                    </Col>
                    <Col md={3}>
                        <div className="service-item">Service 3</div>
                    </Col>
                    <Col md={3}>
                        <div className="service-item">Service 4</div>
                    </Col>
                </Row>
            </div>
        </section>
    );

}