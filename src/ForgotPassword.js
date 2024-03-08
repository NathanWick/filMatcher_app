import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoHeader from './LogoHeader';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle password reset logic here

        // After password reset, redirect to the login page
        navigate('/login');
    };

    return (
        <div style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL + '/popcorn_img.webp'})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100vh',
            overflow: 'auto'
        }} className="flex items-center justify-center">
            <form className="m-5 p-10 bg-white bg-opacity-95 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <LogoHeader />               



                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mt-1 border rounded-md border-gray-300" />
                
                <input type="submit" value="Reset Password" className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md cursor-pointer" />
            </form>
        </div>
    );
}

export default ForgotPassword;