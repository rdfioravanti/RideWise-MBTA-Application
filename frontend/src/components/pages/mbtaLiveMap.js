import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MBTA_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your own API key

function Map() {
  const [vehicles, setVehicles] = useState([]);

  // Retrieve vehicle data from the MBTA API and update state
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`https://api-v3.mbta.com/vehicles`);
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
    <MapContainer center={[42.3601, -71.0589]} zoom={12} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map(vehicle => (
        <Marker key={vehicle.id} position={[vehicle.attributes.latitude, vehicle.attributes.longitude]}>
          <Popup>
            <p>Vehicle ID: {vehicle.id}</p>
            <p>Vehicle Bearing: {vehicle.attributes.bearing}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;