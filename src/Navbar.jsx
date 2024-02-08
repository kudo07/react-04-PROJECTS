import React from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/sea-green';
const Navbar = ({ data }) => {
  return (
    <Splide
      options={{
        type: 'slide',
        perPage: 4,
        breakpoints: {
          600: {
            perPage: 1,
          },
          // drag: true, // Enable drag and scroll with the mouse.
          // wheel: true,
        },
      }}
    >
      {data.map((item) => (
        <SplideSlide key={item.id || item}>
          <div className="container">
            <div className="PriceColumn-badge">
              <div className="Badge is-highlightBadge">
                <Link
                  to={item.to}
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  <span className="heading1">{item.projectName}</span>
                </Link>
              </div>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Navbar;
