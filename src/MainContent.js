import React from 'react';
import MovieCard from './MovieCard';

const MainContent = () => {
    return (
        <main className="my-8 bg-blue-200">
            {/* Sub-navigation Bar */}
            {/* Movie Releases Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Map through your movies array and render MovieCard components */}
                {/* <MovieCard /> */}
            </div>
        </main>
    );
};

export default MainContent;