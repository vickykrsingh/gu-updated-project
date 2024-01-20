import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAddress } from '../context/SetCurrentAddress';

const GeolocationComponent = () => {
  const [location, setLocation] = useState(null);
  // const [addressComponents, setAddressComponents] = useState({});s
  const {currentAddress,setCurrentAddress} = useAddress({})

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Use the OpenCage Geocoding API to get address components from coordinates
          const apiKey = 'e0a25fdf275f45ac9ac406a8d9ece33c';
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

          try {
            const response = await axios.get(apiUrl);
            console.log(response)
            const firstResult = response.data.results[0];

            if (firstResult) {
              const {
                components: {
                  country,
                  state,
                  village,
                  state_district,
                  postcode,
                  city,
                  road,
                  // Add more components as needed
                },
              } = firstResult;

              setCurrentAddress({
                country,
                postcode,
                city,
                road,
                state,
                village,
                state_district
                // Add more components as needed
              });
            } else {
              setCurrentAddress({ error: 'No address found' });
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            setCurrentAddress({ error: 'Error fetching address' });
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div>
      {location ? (
        <div>
          <p>Your current location: {location.latitude}, {location.longitude}</p>
          <p>Country: {currentAddress.country}</p>
          <p>Postal Code: {currentAddress.postcode}</p>
          <p>City: {currentAddress.city}</p>
          <p>Street: {currentAddress.road}</p>
          <p>state:{currentAddress.state}</p>
          <p>village:{currentAddress.village}</p>
          <p>state_district:{currentAddress.state_district}</p>
          {/* Add more components as needed */}
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
