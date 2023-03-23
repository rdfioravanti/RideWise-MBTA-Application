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

const MapContainer = () => {
  const [map, setMap] = useState(null);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
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
    let intervalId;
    const fetchData = async () => {
      const response = await axios.get("https://api-v3.mbta.com/vehicles");
      const filteredData = response.data.data.filter((vehicle) => {
  if (selectedType === "All" || vehicle.attributes.vehicle_type === selectedType) {
    return true;
  }
  return false;
});
      const features = filteredData.map((vehicle) => {
        const [longitude, latitude] = vehicle.attributes["longitude"]
          ? [vehicle.attributes.longitude, vehicle.attributes.latitude]
          : [null, null];
        const geometry = new Point(fromLonLat([longitude, latitude]));
        const style = new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 0.5,
          }),
        });
        const feature = new Feature(geometry);
        feature.setStyle(style);
        return feature;
      });
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features,
        }),
      });
      if (map) {
        map.removeLayer(map.getLayers().item(1));
        map.addLayer(vectorLayer);
      }
    };

    intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [map, selectedType]);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "flex-start" }}>
      <div id="map" style={{ width: "80%", height: "100%" }}></div>
      <div style={{ width: "20%", height: "100%", backgroundColor: "#f2f2f2", padding: "20px" }}>
        <h3>Filter by Vehicle Type</h3>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="All">All</option>
          <option value="bus">Bus</option>
          <option value="subway">Subway</option>
          <option value="light_rail">Light Rail</option>
          <option value="commuter_rail">Commuter Rail</option>
          <option value="ferry">Ferry</option>
        </select>
      </div>
    </div>
  );
};

export default MapContainer;