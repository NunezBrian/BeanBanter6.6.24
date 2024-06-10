import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import SearchBar from './SearchBar'; // Assuming SearchBar.jsx is in the same directory

const containerStyle = {
  width: '100%',
  height: '400px'
};

const libraries = ['places']; 

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDLxAFQEwVWNrZWmxtAQt61YuM5jXVMwAk', // Replace 'YOUR_API_KEY' with your actual API key
    libraries: libraries,
  });

  const [selectedShop, setSelectedShop] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });

  const handleSearch = (query) => {
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded.');
      return;
    }

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.textSearch({
      query: `coffee shops in ${query}`, // Include 'coffee shops in' to specify the type of places being searched
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSearchResults(results);
        console.log('Found coffee shops:', results);
        if (results.length > 0) {
          setCenter(results[0].geometry.location); // Set center to the location of the first result
        }
      } else {
        console.error('Search failed:', status);
      }
    });
  };

  return isLoaded ? (
    <div>
      <SearchBar onSearch={handleSearch} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {searchResults.map((result, index) => (
          <Marker
            key={`result-${index}`} // Use a unique key for each marker
            position={result.geometry.location}
            onClick={() => setSelectedShop(result)}
          />
        ))}
        {selectedShop && (
          <InfoWindow
            position={{ lat: selectedShop.geometry.location.lat(), lng: selectedShop.geometry.location.lng() }}
            onCloseClick={() => setSelectedShop(null)}
          >
            <div>
              <h3>{selectedShop.name}</h3>
              <p>{selectedShop.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((shop, index) => (
            <li key={`shop-${index}`}>
              <h3>{shop.name}</h3>
              <p>{shop.vicinity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : <></>;
};

export default Maps;