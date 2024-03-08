import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        
        if (query.length < 1) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(`https://filmatcher.com/api/scrape?title=${encodeURIComponent(query)}&count=5`);
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
        setQuery(movie);
        setSuggestions([]);
    };

    return (
        <div className="w-full max-w-sm mx-auto mb-3">
            <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-5 py-3 text-lg leading-tight text-gray-700 border rounded-full shadow appearance-none focus:outline-none focus:shadow-outline"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
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