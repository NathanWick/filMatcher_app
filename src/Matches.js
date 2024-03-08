import React from 'react';
import Carousel from './Carousel';
import Header from './Header';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex-1 overflow-auto mt-24 md:mt-48">
                <div className="container mx-auto px-1">
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <Carousel title="Because you liked Green Mile..."/>
                            <Carousel title="Because you liked Forrest Gump..."/>
                            <Carousel title="Because you liked Just Friends..."/>
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
