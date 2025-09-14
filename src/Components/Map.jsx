import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const Map = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const token = import.meta.env.VITE_MAPPLS_API_KEY; // Environment variable for token

  const loadObject = {
    map: true,
    layer: "raster",
    version: "3.0",
    libraries: ["polydraw"],
    plugins: ["direction", "search"], // Add 'search' plugin
  };

  useEffect(() => {
    mapplsClassObject.initialize(`${token}`, loadObject, () => {
      const newMap = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [28.633, 77.2194],
          zoom: 4,
        },
      });

      newMap.on("load", () => {
        setIsMapLoaded(true);

        // Initialize search plugin
        new mapplsPluginObject.search({
          map: newMap,
          placeholder: "Search Location",
          divId: "search-map",
          width: "300px",
        });
      });

      mapRef.current = newMap;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div style={{ width: "90%", height: "90vh", position: "relative" }}>
      <div
        id="map"
        style={{ width: "90%", height: "90%", display: "inline-block" }}
      />
      {/* Search UI container */}
      <div
        id="search-map"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      />
    </div>
  );
};

export default Map;
