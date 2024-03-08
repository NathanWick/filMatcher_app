import React from 'react';

const LogoHeader = () => {
    return (
        <div className="flex items-center justify-center">
            <img src={`${process.env.PUBLIC_URL}/popcorn_logo.png`} alt="Logo" className="h-16 w-auto mr-2 md:h-24 md:w-auto" />                    
            <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
                <span>fil</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-11xl">M</span>                    
                <span>atcher</span>
            </h1>
        </div>  
    );
};

export default LogoHeader;