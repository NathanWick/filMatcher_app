import React from 'react';
import Header from './Header';

const About = () => {
    return (
        <>
        <Header />
        <div className="container p-3 mt-20 md:mt-48">
            
            <h1 className="text-4xl font-bold mb-4">About filMatcher</h1>
            <p className="text-lg mb-2 mr-2">
                filMathcer is an AI movie recommender. Rate movies and get personalized movie suggestions.
            </p>
            <p className="text-lg mb-2">
                Swipe right if you like a movie, or swipe left if you don't. 
                Your ratings will be used to provide personalized movie recommendations.
            </p>
            <p className="text-lg">
                See what your friends' favorite movies are. Whether you're a casual viewer or a movie buff, 
                filMatcher is a great way to explore the world of cinema and find your next favorite movie.
            </p>
        </div>
        </>
    );
};

export default About;