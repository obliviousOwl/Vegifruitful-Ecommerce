import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';
import '../assets/css/components/FeaturedProducts.css'

export default function FeaturedProducts() {


    const [ previews, setPreviews ] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
        .then(res => res.json())
        .then(data => {
            const numbers = [];
			const featured = [];
            const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.products.length);
				if(numbers.indexOf(randomNum) === -1) {
					numbers.push(randomNum);
				} else {
					generateRandomNums();
				}
			}
            for(let i = 0; i < 4; i++) {

				generateRandomNums();

				featured.push(
					<PreviewProducts data={data.products[numbers[i]]} key={data.products[numbers[i]]._id} breakPoint={2} />
				)
			}
            setPreviews(featured);
        })
    }, [])
    return (
        <section className='main-section'>
            <Container>
                <Row className="justify-content-center mb-3 pb-3">
                    <Col md={12} className="heading-section text-center ftco-animate fadeInUp ftco-animated">
                        <span className="subheading">Featured Products</span>
                        <h2 className="mb-4">Our Products</h2>
                        <p>Amidst the lush fields, nestled in nature's bounty, a paradise awaits with the freshest fruits and vegetables.</p>
                    </Col>
                </Row>
            </Container>

            <Container>
                <div className="row">
                    { previews }
                </div>
            </Container>
        </section>
    );
}
