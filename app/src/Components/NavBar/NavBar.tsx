import { Link } from 'react-router-dom';
import useNavBarStore from './useNavBarStore';

function BasketballNavBar() {
  const { isDropdownOpen, toggleDropdown } = useNavBarStore();

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
            <Link to="/" className="font-bold text-white">
              My Basketball App
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <button
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={toggleDropdown}
                >
                  Menu
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Home
                      </Link>
                      <Link
                        to="/tournaments"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Tournaments
                      </Link>
                      <Link
                        to="/profile-page"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Profile Page
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default BasketballNavBar;
