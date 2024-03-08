import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoHeader from './LogoHeader';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // useEffect to disable scrolling on mount and enable it on unmount
    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = 'hidden';

        // Function to re-enable scrolling
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []); // Empty array means this effect runs only once on mount and cleanup runs on unmount

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your existing login logic...
        fetch('https://filmatcher.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.access_token);
            console.log('Logged in successfully:', data);
            navigate('/home');
        })
        .catch(error => {
            console.error('There was an error logging in:', error);
        });
    };

    return (
        <div style={{ 
            backgroundImage: `url('https://fighter-data.us-lax-1.linodeobjects.com/popcorn_img.webp')`,            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100vh',
            overflow: 'hidden' // You might want to remove or adjust this depending on your needs
        }} className="flex items-center justify-center">
            <form className="m-5 p-10 bg-white bg-opacity-95 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <LogoHeader />
                
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full p-2 mt-1 border rounded-md border-gray-300" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 mt-1 border rounded-md border-gray-300" />
                
                <input type="submit" value="Login" className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md cursor-pointer" />
                <div className="flex justify-between mt-4 text-sm text-blue-600">
                    <a href="/create-account" onClick={(e) => { e.preventDefault(); navigate('/create-account'); }}>Create Account</a>
                    <a href="/forgot-password" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot Password?</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
