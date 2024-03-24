import React, { useState, useRef, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

const CarouselItem = ({ item, refresh }) => {
  const [showReason, setShowReason] = useState(false);
  const reasonRef = useRef(null);
  const [currentRating, setCurrentRating] = useState(item.wordRating);

  useEffect(() => {
    if (showReason && reasonRef.current) {
      const rect = reasonRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        reasonRef.current.style.left = 'auto';
        reasonRef.current.style.right = '0';
      }
    }
  }, [showReason]);

const handleRating = async (rating) => {
  setCurrentRating(rating);
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `https://filmatcher.com/api/add_review?movieID=${item.movieID}&wordRating=${rating}&numberRating=1`,
      {},
      { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    refresh();
  } catch (error) {
    console.error(error);
    setCurrentRating(item.wordRating);
  }
};

  return (
    <div className="flex-none pr-2">
      <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="h-64 flex items-center justify-center relative bg-slate-200 flex-grow">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full object-cover"
            style={{ width: 'auto', maxWidth: 'none' }}
          />
          <div
            className="absolute flex justify-center items-center bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center"
            style={{ padding: '5px' }}
          >
            <button 
              onClick={() => handleRating('loved')} 
              className={`text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-100 active:bg-pink-700 mr-2 ${currentRating === 'loved' ? 'bg-pink-300 transform scale-125 opacity-100' : 'bg-pink-500 opacity-50'}`}
            >
              ❤️
            </button>
            <button 
              onClick={() => handleRating('good')} 
              className={`text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-100 active:bg-green-700 mr-2 ${currentRating === 'good' ? 'bg-green-300 transform scale-125 opacity-100' : 'bg-green-500 opacity-50'}`}
            >
              👍
            </button>
            <button 
              onClick={() => handleRating('bad')} 
              className={`text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-100 active:bg-red-700 ml-2 ${currentRating === 'bad' ? 'bg-red-300 transform scale-125 opacity-100' : 'bg-red-500 opacity-50'}`}
            >
              👎
            </button>
            <button 
              onClick={() => handleRating('unseen')} 
              className={`text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-100 active:bg-blue-700 ml-2 ${currentRating === 'unseen' ? 'bg-blue-300 transform scale-125 opacity-100' : 'bg-blue-500 opacity-50'}`}
            >
              ❓
            </button>
          </div>
        </div>
        <div className="p-2 bg-white bg-opacity-90 w-full max-w-none flex-shrink">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold truncate">
                {item.title}
              </h3>
              {item.reason ? (
                <InfoIcon
                  className="text-blue-500 cursor-pointer"
                  onMouseEnter={() => setShowReason(true)}
                  onMouseLeave={() => setShowReason(false)}
                />
              ) : null}
            </div>
            <p>
              {item.year} <span className="bg-yellow-300 px-1">{item.rating}</span> {item.runtime}
            </p>
          </div>
        </div>
      </div>
      {showReason && (
        <div ref={reasonRef} className="absolute z-10 mt-2 p-2 bg-white bg-opacity-90 text-sm rounded shadow-md">
          {item.reason}
        </div>
      )}
    </div>
  );
};

export default CarouselItem;