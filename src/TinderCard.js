import React, { useState } from 'react';
import data from './data.json';

const TinderCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const movie = data.resources[currentIndex];

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      // Animation to the right (liked)
      const card = document.getElementById('card');
      card.classList.add('animate-swipe-right');
      setTimeout(() => {
        card.classList.remove('animate-swipe-right');
        setCurrentIndex(currentIndex + 1);
      }, 500);
    } else {
      // Animation to the left (disliked)
      const card = document.getElementById('card');
      card.classList.add('animate-swipe-left');
      setTimeout(() => {
        card.classList.remove('animate-swipe-left');
        setCurrentIndex(currentIndex + 1);
      }, 500);
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div id="card" className="bg-white shadow-md rounded-lg max-w-md relative">
        <img src={movie.imageUrl} alt={movie.title} className="w-full rounded-t-lg" />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <a href={movie.link} className="text-blue-500 hover:underline">
            {movie.link}
          </a>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => handleSwipe('left')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-4"
          >
            Dislike
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default TinderCard;