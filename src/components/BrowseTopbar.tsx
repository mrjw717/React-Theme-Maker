import React from 'react';
import { Home, Search, MapPin, List, Grid } from 'lucide-react';

const BrowseTopbar: React.FC = () => {
  const sidebarWidth = '200px'; // Define sidebar width

  return (
    <div className="bg-white py-4 shadow-md">
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: '80%', marginLeft: '10%' }}>
        {/* Logo Area */}
        <div style={{ width: sidebarWidth }}>
          <a
            href="/"
            className="text-2xl font-bold text-primary-500"
            style={{ textAlign: 'left' }}
          >
            <Home
              size={30}
              style={{ display: 'inline-block', marginRight: '8px' }}
            />
            Classifinds
          </a>
        </div>

        {/* Search Bar and Icons (Right) */}
        <div className="flex items-center flex-grow">
          {/* Search Bar (Middle) */}
          <input
            type="text"
            placeholder="Search listings..."
            className="flex-grow border rounded-md py-2 px-4 mr-2"
          />

          {/* Icons (Right-Aligned within the Right Container) */}
          <div className="flex">
            <button className="font-bold py-2 px-4 rounded-md bg-primary-gradient text-white transition-all duration-300 ease-in-out">
              <Search size={20} style={{ display: 'inline-block' }} />
            </button>

            {/* Location Button */}
            <button className="font-bold py-2 px-4 rounded-md ml-2 bg-location-button-gradient text-white transition-all duration-300 ease-in-out">
              <MapPin size={20} style={{ display: 'inline-block' }} />
            </button>

            {/* Sort Button */}
            <button className="font-bold py-2 px-4 rounded-md ml-2 bg-gray-gradient text-white transition-all duration-300 ease-in-out">
              <List size={20} style={{ display: 'inline-block' }} />
            </button>

            {/* Grid View Button */}
            <button className="font-bold py-2 px-4 rounded-md ml-2 bg-secondary-gradient text-white transition-all duration-300 ease-in-out">
              <Grid size={20} style={{ display: 'inline-block' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTopbar;
