import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TinderCard = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://filmatcher.com/api/movies?count=20');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleSwipe = async (direction) => {
    const movie = movies[currentIndex];
    const wordRating = direction === 'right' ? 'Good' : 'Bad';
    const numberRating = direction === 'right' ? 5 : 1;
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        `https://filmatcher.com/api/add_review?movieID=${encodeURIComponent(movie.id)}&wordRating=${encodeURIComponent(wordRating)}&numberRating=${encodeURIComponent(numberRating)}&reviewText=${encodeURIComponent('')}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Review submitted successfully');
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error, e.g., show an error message
    }
  
    const card = document.getElementById('card');
    if (direction === 'right') {
      // Animation to the right (liked)
      card.classList.add('animate-swipe-right');
      setTimeout(() => {
        card.classList.remove('animate-swipe-right');
        setCurrentIndex(currentIndex + 1);
      }, 500);
    } else {
      // Animation to the left (disliked)
      card.classList.add('animate-swipe-left');
      setTimeout(() => {
        card.classList.remove('animate-swipe-left');
        setCurrentIndex(currentIndex + 1);
      }, 500);
    }
  };

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  const movie = movies[currentIndex];

  return (
    <div className="flex justify-center">
      <div id="card" className="w-64 bg-white shadow-md rounded-lg overflow-hidden relative">
        <div className="card-content">
          <img src={movie.image_url} alt={movie.name} className="w-full h-auto object-contain" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{movie.name}</h2>
            <p>
              {movie.year}
              <span className="bg-yellow-300 px-1">{movie.rating}</span>
              {movie.runtime}
            </p>
          </div>
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