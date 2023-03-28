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
      let url;
      if (selectedType === "All") {
        url = "https://api-v3.mbta.com/vehicles";
      } else {
        url =
          "https://api-v3.mbta.com/vehicles?filter%5Broute_type%5D=" +
          selectedType;
      }
      const response = await axios.get(url);
      const filteredData = response.data.data.filter((vehicle) => {
        if (selectedType === "All") {
          return true;
        } else {
          return vehicle.relationships.route.data;
        }
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
