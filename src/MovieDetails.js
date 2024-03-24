import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { title, year } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const response = await axios.get(`https://filmatcher.com/api/get_movie_details?movie_name=${encodeURIComponent(title)}&movie_year=${encodeURIComponent(year)}`);
                console.log('Response:', response.data);
                setMovieDetails(response.data[0]); // Access the first element of the array
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        getMovieDetails();
    }, [title, year]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
<div className="relative">
    <img src={movieDetails.image_url} alt={movieDetails.name} className="w-full h-screen object-cover" />
    <div className="absolute top-0 bg-black bg-opacity-85 text-white w-full p-5">
        <h1 className="text-6xl">{movieDetails.name}</h1>
        <p className="text-4xl">{movieDetails.year}</p>
        <p className="text-3xl">{movieDetails.runtime}</p>
    </div>
</div>
    );
};

export default MovieDetails;