
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <div className="card">
            <h3>Card 1</h3>
            <p>This is the content of card 1.</p>
          </div>
        </div>
        <div>
          <div className="card">
            <h3>Card </h3>
            <p>This is the content of card 1.</p>
          </div>
        </div>
        <div>
          <div className="card">
            <h3>Card </h3>
            <p>This is the content of card 1.</p>
          </div>
        </div>
        <div>
          <div className="card">
            <h3>Card </h3>
            <p>This is the content of card 1</p>
          </div>
        </div>
        <div>
          <div className="card">
            <h3>Card </h3>
            <p>thid si the </p>
          </div>
        </div>
        <div>
          <div className="card">
            <h3>Card </h3>
            <p>This is the content.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
