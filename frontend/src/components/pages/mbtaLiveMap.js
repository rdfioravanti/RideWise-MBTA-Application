import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MBTA_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your own API key

function App() {
  const [viewport, setViewport] = useState({
    latitude: 42.3601,
    longitude: -71.0589,
    zoom: 12
  });

  const [vehicles, setVehicles] = useState([]);

  // Retrieve vehicle data from the MBTA API and update state
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`https://api-v3.mbta.com/vehicles?api_key=${MBTA_API_KEY}&filter[route_type]=3&include=trip`);
        const data = await response.json();
        setVehicles(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch vehicle data every 15 seconds
    const interval = setInterval(() => {
      fetchVehicles();
    }, 15000);

    fetchVehicles();

    return () => clearInterval(interval);
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken="YOUR_MAPBOX_API_KEY_HERE" // Replace with your own Mapbox API key
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {vehicles.map(vehicle => (
        <Marker key={vehicle.id} latitude={vehicle.attributes.latitude} longitude={vehicle.attributes.longitude}>
          <img src="/bus-icon.png" alt="Bus icon" style={{ width: '24px', height: '24px', transform: `rotate(${vehicle.attributes.bearing}deg)` }} />
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default App;