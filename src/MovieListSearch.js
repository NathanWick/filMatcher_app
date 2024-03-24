import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MovieListSearch = ({ listID, onRefreshList }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const movieTitleRegex = /^.* \(\d{4}\)$/;
  const debounceTimeoutRef = useRef(null);
  const queryRef = useRef('');


  
  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }
  
    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const match = query.match(/(.*) \((\d{4})\)/);
        let title = query;
        let year = '';
        if (match) {
          title = match[1].trim();
          year = match[2];
        }
        const response = await axios.get(`https://filmatcher.com/api/scrape?title=${encodeURIComponent(title)}&year=${encodeURIComponent(year)}&count=4`);
        const results = response.data
            ? response.data
                    .filter(movie => movie.name && movie.year)
                    .map(movie => `${movie.name} (${movie.year})`)
                    .slice(0, 20)
            : [];
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching movie suggestions:', error);
        setIsLoading(false);
      }
      setIsLoading(false);
    };
  
    if (!movieTitleRegex.test(query)) {
      if (query !== queryRef.current) {
        // Clear the previous timeout
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
        // Set a new timeout to fetch suggestions after 1 second
        debounceTimeoutRef.current = setTimeout(fetchSuggestions, 1000);
      }
    } else {
      setSuggestions([]);
    }
  
    // Update the queryRef with the current query value
    queryRef.current = query;
  }, [query]);


  const handleSuggestionClick = (movie) => {
    setQuery(movie);
    setSuggestions([]);
  };
  

  
  

  const handleAddMovie = async ({ listID, title }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`https://filmatcher.com/api/add_movie_to_list?listID=${encodeURIComponent(listID)}&title=${encodeURIComponent(title)}}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Movie added:', response.data);
      setQuery('');
      onRefreshList(listID); // Call the onRefreshList function with listID
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mb-3 relative">
      <div className="flex">
        <input
          type="text"
          placeholder="Search movies..."
          className={`w-full px-5 py-3 text-lg leading-tight text-gray-700 border rounded-l-full shadow appearance-none focus:outline-none focus:shadow-outline pl-10 ${isLoading ? 'moving-lights-border' : ''}`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full focus:outline-none focus:shadow-outline ${!movieTitleRegex.test(query) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleAddMovie({ listID: listID, title: query })}
          disabled={!movieTitleRegex.test(query)}
        >
          Add
        </button>
      </div>
      {!movieTitleRegex.test(query) && (
        <ul className="space-y-0 px-5">
          {suggestions.map((movie, index) => (
            <li
              key={index}
              className="p-1 bg-gray-200 cursor-pointer hover:bg-gray-300 text-sm"
              onClick={() => handleSuggestionClick(movie)}
            >
              {movie}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieListSearch;