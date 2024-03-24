import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieSearch = ({ onRefreshList }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [listName, setListName] = useState('');
    const [aiGenerate, setAiGenerate] = useState(false);
    const [quantity, setQuantity] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
    
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
              setShowDialog(false);
          }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      // Clean up the event listener when the component is unmounted or before it re-renders
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
    }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

    useEffect(() => {
        
        if (query.length < 1) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(`https://filmatcher.com/api/movies?title=${encodeURIComponent(query)}&count=5`, { timeout: 120000 });
                const results = response.data
                    .filter(movie => movie.name && movie.year) // Filter out movies without a name or year
                    .map(movie => `${movie.name} (${movie.year})`) // Include the year in the suggestion
                    .slice(0, 5); // Limit to first 5 results
                setSuggestions(results);
            } catch (error) {
                console.error('Error fetching movie suggestions:', error);
            }
        };

        fetchSuggestions();
    }, [query]);

    const handleSuggestionClick = (movie) => {
      const [title, year] = movie.split(' (');
      window.location.href = `https://filmatcher.com/${encodeURIComponent(title)}/${encodeURIComponent(year.slice(0, -1))}`;
    };


    const handleButtonClick = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
          if (listName) {
            let response;
            if (aiGenerate) {
              response = await axios.get(`https://filmatcher.com/api/get_recommend_list?quantity=${quantity}&like_list=${encodeURIComponent(listName)}`, { 
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                timeout: 120000 
              });
            } else {
              response = await axios.get(`https://filmatcher.com/api/create_list?list_name=${encodeURIComponent(listName)}`, { 
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                timeout: 120000 
              });
            }
            onRefreshList();
          }
        } catch (error) {
          console.error('Error:', error);   
        }
        setIsLoading(false);
        setShowDialog(false);
      };
    


      return (
        <div className="w-full max-w-sm mx-auto mb-3">
          <div className="flex">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full px-5 py-3 text-lg leading-tight text-gray-700 border rounded-l-full shadow appearance-none focus:outline-none focus:shadow-outline"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={() => setShowDialog(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full focus:outline-none focus:shadow-outline"
              style={{ flex: '0 0 auto' }}
            >
              New List
            </button>
          </div>

          {showDialog && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
    <form onSubmit={handleButtonClick} className={`bg-white p-4 rounded-md w-96 relative ${isLoading ? 'moving-lights-border' : ''}`}>
      <button onClick={() => setShowDialog(false)} className="absolute top-2 right-2 text-2xl p-2 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center">&times;</button>
      <h2 className="text-2xl mb-4 text-center">New List</h2>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleButtonClick(e);
          }
        }}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        placeholder="List name"
        required
      />
      <label className="flex items-center mb-4">
        <span className="mr-2">AI Generate:</span>
        <input type="checkbox" checked={aiGenerate} onChange={(e) => setAiGenerate(e.target.checked)} />
      </label>
      {aiGenerate && (
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleButtonClick(e);
            }
          }}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          min="1"
          max="100"
          required
        />
      )}
      <button type="submit" className={`w-full p-2 bg-blue-500 text-white rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>Create List</button>
    </form>
  </div>
)}

          <ul className="space-y-0 px-4">
            {suggestions.map((movie, index) => (
              <li key={index} className="p-1 bg-gray-200 cursor-pointer hover:bg-gray-300 text-sm" onClick={() => handleSuggestionClick(movie)}>
                {movie}
              </li>
            ))}
          </ul>
        </div>
      );
};

export default MovieSearch;