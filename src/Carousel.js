// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import data from './data.json';

const Carousel = ({ title }) => { // Add title as a prop
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex === data.resources.length - 1 ? 0 : prevIndex + 1);
    }, 5000); // Increased the interval to 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollTo({
        left: currentIndex * carousel.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className = "border-4 border-black rounded-xl my-5">
    <h2 className="text-4xl mt-3 ml-3 text-black">{title}</h2> {/* Use the title prop here */}
    <div className="overflow-x-auto p-4">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
      >
        {data.resources.map((item, index) => (
          <div key={index} className="flex-none lg:w-1/6 pr-2">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 overflow-hidden">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>              
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Carousel;