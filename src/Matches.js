import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import Header from './Header';
import MovieSearch from './MovieSearch';

const Home = () => {
    const [movieLists, setMovieLists] = useState([]);

    useEffect(() => {
        fetch('https://filmatcher.com/api/user_movies?userID=1')
            .then(response => response.json())
            .then(data => setMovieLists(data.resources));
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <div className="flex-1 overflow-auto mt-20 md:mt-44">
                <div className="container mx-auto px-1">
                    <div className="flex flex-wrap">    
                        <div className="w-full">
                            <MovieSearch />

                            {movieLists.map((list, index) => (
                                <Carousel key={index} title={list.listName} data={list.movies} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;