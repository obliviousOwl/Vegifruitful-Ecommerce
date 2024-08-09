import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import '../assets/css/components/Slider.css'

export default function Slider() {
  return (
      <Carousel className="w-100" fade interval={1600} controls={false} indicators={false}>
        <Carousel.Item style={{ height: `calc(100vh - 56px)` }}>
          <div className="carousel-content">
            <Image
              className="d-block w-100"
              src="https://themewagon.github.io/vegefoods/images/bg_1.jpg"
              alt="First slide"
            />
            <div className="carousel-overlay"></div>
            <div className="carousel-text text-uppercase col-md-12"> 
              <h2>We serve Fresh Vegestables & Fruits</h2>
              <h2 className="subheading mb-4">
                We deliver organic vegetables &amp; fruits
              </h2>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item style={{ height: `calc(100vh - 56px)` }}>
          <div className="carousel-content">
            <Image
              className="d-block w-100"
              src="https://themewagon.github.io/vegefoods/images/bg_2.jpg"
              alt="Second slide"
            />
            <div className="carousel-overlay"></div>
            <div className="carousel-text text-uppercase col-md-12"> 
            <h2 className="mb-2">100% Fresh &amp; Organic Foods</h2>
            <h2 className="subheading mb-4">We deliver organic vegetables &amp; fruits</h2>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
  );
}
