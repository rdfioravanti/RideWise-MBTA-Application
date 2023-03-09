const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your own API key

// Create an object to store vehicle data
const vehicleData = {};

// Make a request to the MBTA API to retrieve vehicle locations
fetch(`https://api-v3.mbta.com/vehicles?api_key=${apiKey}&filter[route_type]=3&include=trip`)
  .then(response => response.json())
  .then(data => {
    // Store the vehicle data in the vehicleData object
    data.data.forEach(vehicle => {
      vehicleData[vehicle.id] = {
        latitude: vehicle.attributes.latitude,
        longitude: vehicle.attributes.longitude,
        bearing: vehicle.attributes.bearing,
        tripId: vehicle.relationships.trip.data.id,
        routeId: vehicle.relationships.route.data.id
      };
    });

    // Log the vehicle data to the console
    console.log(vehicleData);
  })
  .catch(error => {
    console.error(error);
  });