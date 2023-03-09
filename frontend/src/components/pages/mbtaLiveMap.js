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
    const fetchData = async () => {
      const response = await axios.get(
        "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip"
      );
      const features = response.data.data.map((vehicle) => {
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
      map.addLayer(vectorLayer);
    };
    if (map !== null) {
      fetchData();
    }
  }, [map]);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default MapContainer;