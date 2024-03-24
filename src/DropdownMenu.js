import React, { useState } from 'react';
import axios from 'axios';


const DropdownMenu = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);

const handleSeeMoreLike = async (name) => {
    try {
        const response = await axios.post(`https://filmatcher.com/api/get_recommend_list?like_list=${encodeURIComponent(name)}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(response.data.message);
    } catch (error) {
        console.error('Failed to add movie to list:', error);
    }
};

  return (
    <div className="absolute top-0 right-0 m-2">
      <div
        className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute top-10 right-0 bg-white shadow-md rounded py-2">
          <button
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            onClick={handleSeeMoreLike}
          >
            See More Like This
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;