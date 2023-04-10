import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { usePlayerStore } from '../zustand/playerStore';

const BasketballNavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const selectedPlayer = usePlayerStore(state => state.selectedPlayer);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleHomeClick = () => {
    navigate('/');
    toggleDropdown();
  };

  const handleAdminsClick = () => {
    navigate('/admins-page');
    toggleDropdown();
  };

  const handleProfilePageClick = () => {
    navigate('/profile-page');
    toggleDropdown();
  };
  const handleGameClick = () => {
    navigate('/games');
    toggleDropdown();
  };

  const firstName = selectedPlayer?.firstName[0] ?? '';
  const lastName = selectedPlayer?.lastName[0] ?? '';
  const initials = `${firstName[0]}${lastName[0]}`;

  console.log('initials:', initials);
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="mr-2 h-12 w-12"
              src="http://llw-magento-images-prod.s3.amazonaws.com/catalog/product/f/o/fo25479708x.jpg"
              alt="My App Logo"
            />
            <div className="font-bold text-white">My Basketball App</div>
            <Avatar
              initials={initials}
              // fgColor={}
              name={initials}
              size="65"
              className="absolute left-0 top-2 h-16 w-16"
            />
          </div>
          <div className="ml-auto">
            <button
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={toggleDropdown}
            >
              Menu
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={handleHomeClick}
                >
                  Home
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={handleProfilePageClick}
                >
                  Profile Page
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={handleAdminsClick}
                >
                  Admin Page
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={handleGameClick}
                >
                  Games
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default BasketballNavBar;
