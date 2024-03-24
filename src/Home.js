// Home.js
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import Header from './Header';
import MovieSearch from './MovieSearch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movieLists, setMovieLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    fetchMovieLists();
  }, [navigate]);

  const fetchMovieLists = () => {
    const token = localStorage.getItem('token');
    fetch('https://filmatcher.com/api/user_movies?userID=1', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMovieLists(data.resources))
      .catch(error => {
        console.error('Error:', error);
        navigate('/logout');
      });
  };

  const fetchMovieList = (listID) => {
    const token = localStorage.getItem('token');
    fetch(`https://filmatcher.com/api/user_movies?listID=${listID}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMovieLists(prevLists => prevLists.map(list => {
          if (list.listID === listID) {
            return { ...list, movies: data.movies };
          }
          return list;
        }));
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/logout');
      });
  };

  const handleRefreshList = (listID) => {
    fetchMovieList(listID);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-1 overflow-auto mt-20 md:mt-44">
        <div className="container mx-auto px-1">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="flex items-center justify-center space-x-4">
                <MovieSearch onRefreshList={fetchMovieLists} />
              </div>
              {movieLists.map((list, index) => (
                <Carousel
                  key={index}
                  listID={list.listID}
                  title={list.listName}
                  data={list.movies}
                  onRefreshList={handleRefreshList}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;