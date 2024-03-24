// Carousel.js
import React, { useState, useEffect, useRef } from 'react';
import MovieListSearch from './MovieListSearch';
import axios from 'axios';
import CarouselItem from './CarouselItem';


const Carousel = ({ listID, title, data, onRefreshList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const carouselRef = useRef(null);
  const [refreshList, setRefreshList] = useState(false);
  const [currentListTitle, setCurrentListTitle] = useState(title);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [newListName, setNewListName] = useState(title);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const closePopupsOnEscape = (event) => {
      if (event.key === 'Escape') {
        setShowRenameDialog(false);
        setShowSearchBar(false);
        setShowDropdown(false);
      }
    };

    document.addEventListener('keydown', closePopupsOnEscape);
    
    return () => {
      document.removeEventListener('keydown', closePopupsOnEscape);
    };
  }, []);

  const handleRenameClick = () => {
    setNewListName(title);
    setShowRenameDialog(true);
    setShowDropdown(false);
  };

  const handleRenameSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`https://filmatcher.com/api/rename_list?list_id=${encodeURIComponent(listID)}&new_name=${encodeURIComponent(newListName)}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data.message);
      onRefreshList();
      setShowRenameDialog(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex === (data ? data.length : 0) - 1 ? 0 : prevIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollTo({ left: currentIndex * carousel.offsetWidth, behavior: 'smooth' });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (refreshList) {
      fetch(`https://filmatcher.com/api/user_movies?listID=${listID}`)
        .then(response => response.json())
        .then(data => {
          onRefreshList(data.movies);
          setRefreshList(false);
        });
    }
  }, [refreshList, listID, onRefreshList]);

  const handleAddClick = () => {
    setCurrentListTitle(title);
    setShowSearchBar(true);
    setShowDropdown(false);
  };

  const handleShareClick = () => {
    const movieList = data.map(movie => `${movie.title} (${movie.year})`).join('\n');
    navigator.clipboard.writeText(movieList);
    setShowDropdown(false);
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      try {
        const response = await axios.delete(`https://filmatcher.com/api/remove_list?list_id=${encodeURIComponent(listID)}`);
        console.log(response.data.message);
        onRefreshList();
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  const handleAddMovieToList = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`https://filmatcher.com/api/add_movie_to_list?listID=${encodeURIComponent(listID)}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data.message);
      onRefreshList();
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className={`bg-gray-200 rounded-xl my-5 p-3 relative ${isLoading ? 'moving-lights-border' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl mt-3 ml-3 text-black flex-grow truncate">{title}</h2>
        <div className="flex-shrink-0 flex items-center">
          {/* Dropdown button */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:hidden"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded={showDropdown}
                onClick={toggleDropdown}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            {/* Dropdown menu */}
            {showDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={handleAddClick}
                  >
                    Add
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={handleDeleteClick}
                  >
                    Remove
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={handleRenameClick}
                  >
                    Rename
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={handleAddMovieToList}
                  >
                    More
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={handleShareClick}
                  >
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop buttons */}
          <div className="hidden sm:flex">
            <button
              className="mr-2 bg-slate-300 rounded-md p-1 hover:bg-slate-400 transition-colors duration-200"
              onClick={handleAddClick}
            >
              <img src="https://fonts.gstatic.com/s/i/materialiconsoutlined/add/v6/24px.svg?download=true" alt="Add" style={{ width: '32px', height: '32px' }} />
            </button>
            <button
              className="mr-2 bg-slate-300 rounded-md p-1 hover:bg-slate-400 transition-colors duration-200"
              onClick={handleDeleteClick}
            >
              <img src="https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v6/24px.svg?download=true" alt="Remove" style={{ width: '32px', height: '32px' }} />
            </button>
            <button
              className="mr-2 bg-slate-300 rounded-md p-1 hover:bg-slate-400 transition-colors duration-200"
              onClick={handleRenameClick}
            >
              <img src="https://fonts.gstatic.com/s/i/materialiconsoutlined/edit/v6/24px.svg?download=true" alt="Rename" style={{ width: '32px', height: '32px' }} />
            </button>
            <button
              className="mr-2 bg-slate-300 rounded-md p-1 hover:bg-slate-400 transition-colors duration-200"
              onClick={handleAddMovieToList}
            >
              <img src="https://fonts.gstatic.com/s/i/materialiconsoutlined/playlist_add/v6/24px.svg?download=true" alt="New" style={{ width: '32px', height: '32px' }} />
            </button>
            <button
              className="bg-grey bg-slate-300 rounded-md p-1 hover:bg-slate-400 transition-colors duration-200"
              onClick={handleShareClick}
            >
              <img src="https://fonts.gstatic.com/s/i/materialiconsoutlined/share/v6/24px.svg?download=true" alt="Share" style={{ width: '32px', height: '32px' }} />
            </button>
          </div>
        </div>
      </div>

      {showRenameDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <form onSubmit={handleRenameSubmit} className="bg-white p-4 rounded-md w-96 relative">
            <button onClick={() => setShowRenameDialog(false)} className="absolute top-2 right-2 text-2xl p-2 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center">&times;</button>
            <h2 className="text-2xl mb-4 text-center">Rename List</h2>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRenameSubmit(e);
                }
              }}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              placeholder="New list name"
              required
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Rename</button>
          </form>
        </div>
      )}

      {showSearchBar && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 rounded-md w-96 relative">
            <button onClick={() => setShowSearchBar(false)} className="absolute top-2 right-2 text-2xl p-2 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center">&times;</button>
            <h2 className="text-2xl mb-4 text-center">{currentListTitle}</h2>
            <MovieListSearch listID={listID} onRefreshList={() => onRefreshList(listID)} currentListTitle={currentListTitle} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto p-4">
        <div ref={carouselRef} className="flex transition-transform duration-500 ease-in-out">
          {data && data.map((item, index) => (
            <CarouselItem key={index} item={item} refresh={onRefreshList} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;