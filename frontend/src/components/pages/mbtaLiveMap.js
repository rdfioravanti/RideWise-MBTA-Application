import React, { useEffect, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";
import axios from "axios";
import mapImage from "./resources/MBTA.png";
import getUserInfo from "../../utilities/decodeJwt";

/*
The commented code exists to add stops to the map, but as currently configured there are far
too many stops. This causes the API to take too long to fetch, and the high amount of icons places 
too high a tax on the OpenLayers renderer
*/
const MapContainer = () => {
  const [map, setMap] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const [features, setFeatures] = useState([]);
  const [user, setUser] = useState({})
  

  const fetchAndRenderData = async () => {
    let url;
    if (selectedType === "All") {
      url = "https://api-v3.mbta.com/vehicles";
    } else {
      url =
        "https://api-v3.mbta.com/vehicles?filter%5Broute_type%5D=" +
        selectedType;
    }
    const vehicleResponse = await axios.get(url);
    const filteredVehicleData = vehicleResponse.data.data.filter((vehicle) => {
      if (selectedType === "All") {
        return true;
      } else {
        return vehicle.relationships.route.data;
      }
    });
    const vehicleFeatures = filteredVehicleData.map((vehicle) => {
      const [longitude, latitude] = vehicle.attributes["longitude"]
        ? [vehicle.attributes.longitude, vehicle.attributes.latitude]
        : [null, null];
      const geometry = new Point(fromLonLat([longitude, latitude]));
      const style = new Style({
        image: new Icon({
          src: mapImage,
          scale: 0.025,
        }),
      });
      const feature = new Feature(geometry);
      feature.setStyle(style);
      return feature;
    });
    setFeatures(vehicleFeatures);
  }; 

  useEffect(() => {
    setUser(getUserInfo())
    const initialMap = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-71.1, 42.3]),
        zoom: 12,
      }),
    });
    setMap(initialMap);
  }, []);

  useEffect(() => {
    fetchAndRenderData();
    let intervalId = setInterval(() => {
      fetchAndRenderData();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [selectedType]);

  useEffect(() => {
    if (map) {
      const vectorSource = new VectorSource({
        features,
      });
  
      const vehicleLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 0.5,
          }),
        }),
      });
  
      map.getLayers().forEach((layer) => {
        if (layer instanceof VectorLayer) {
          map.removeLayer(layer);
        }
      });
      map.addLayer(vehicleLayer);
    }
  }, [map, features]);

  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div id="map" style={{ width: "80%", height: "100%" }}></div>
      <div
        style={{
          width: "20%",
          height: "100%",
          backgroundColor: "#f2f2f2",
          padding: "20px",
        }}
      >
        <h3>Filter by Route Type</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="0">Tram, Streetcar, Light Rail</option>
          <option value="1">Subway, Metro</option>
          <option value="2">Rail</option>
          <option value="3">Bus</option>
          <option value="4">Ferry</option>
          <option value="5">Cable Car</option>
          <option value="6">Aerial Lift</option>
          <option value="7">Cable car</option>
          <option value="11">Trolleybus</option>
          <option value="12">Monorail</option>
        </select>
      </div>
    </div>
  );
};

export default MapContainer;
