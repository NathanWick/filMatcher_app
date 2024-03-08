import React from 'react';
import TinderCard from './TinderCard';
import Header from './Header';
import MovieSearch from './MovieSearch';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            

            <div className="flex-1 overflow-auto mt-20 md:mt-44">
                <div className="container mx-auto px-1">
                    <div className="flex flex-wrap">
                        <div className="w-full">

                            <MovieSearch />
                            <TinderCard />
                            {/* other components... */}
                        </div>
                        {/* other components... */}
                    </div>
                </div>
                {/* other components... */}
            </div>
        </div>
    );
};

export default Home;
