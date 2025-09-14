import React, { useState, useEffect, useRef } from "react";

const NearbyMedicineShops = () => {
  const [shops, setShops] = useState([]);
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.209 }); // Default: New Delhi
  const [selectedShop, setSelectedShop] = useState(null); // Track selected shop
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({}); // Store markers for each shop

  // Check if MapmyIndia SDK is loaded
  useEffect(() => {
    const checkSdk = () => {
      if (window.MapmyIndia && window.L) {
        setSdkLoaded(true);
      } else {
        setTimeout(checkSdk, 100); // Retry every 100ms
      }
    };
    checkSdk();
  }, []);

  // Initialize MapmyIndia map when SDK is loaded
  useEffect(() => {
    if (!sdkLoaded || !mapRef.current) return;

    try {
      mapInstanceRef.current = new window.MapmyIndia.Map(mapRef.current, {
        center: [location.lat, location.lng],
        zoom: 12,
      });
    } catch (err) {
      setError("Failed to initialize map: " + err.message);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [sdkLoaded]);

  // Update map center when location changes
  useEffect(() => {
    if (mapInstanceRef.current && location.lat && location.lng) {
      mapInstanceRef.current.setView([location.lat, location.lng], 12);
    }
  }, [location]);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.warn("Geolocation error:", err.message);
          setError(
            "Unable to get your location. Using default location (New Delhi)."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Fetch nearby medicine shops using GET method
  useEffect(() => {
    if (!location.lat || !location.lng) return;

    setLoading(true);
    const url = `http://localhost:5000/api/nearby-pharmacies?lat=${location.lat}&lng=${location.lng}`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch nearby shops");
        return response.json();
      })
      .then((data) => {
        setShops(data.suggestedLocations || []);
        setLoading(false);

        // Add markers to the map
        if (mapInstanceRef.current) {
          // Clear existing markers
          mapInstanceRef.current.eachLayer((layer) => {
            if (layer instanceof window.L.Marker) {
              mapInstanceRef.current.removeLayer(layer);
            }
          });
          markersRef.current = {};

          // Add new markers
          data.suggestedLocations?.forEach((shop, index) => {
            const marker = window.L.marker([
              shop.latitude,
              shop.longitude,
            ]).addTo(mapInstanceRef.current);
            marker.bindPopup(
              `<b>${shop.placeName}</b><br>${shop.placeAddress}`
            );
            markersRef.current[index] = marker; // Store marker by shop index
          });
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [location]);

  // Handle shop click to center map and open popup
  const handleShopClick = (shop, index) => {
    setSelectedShop(index);
    if (mapInstanceRef.current && markersRef.current[index]) {
      mapInstanceRef.current.setView([shop.latitude, shop.longitude], 15); // Zoom in
      markersRef.current[index].openPopup(); // Open the marker's popup
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Nearby Medicine Shops
      </h1>
      {!sdkLoaded && (
        <p className="text-center text-yellow-500">Loading map SDK...</p>
      )}
      <div
        ref={mapRef}
        className="mb-4 rounded-lg shadow"
        style={{ height: "400px", width: "100%" }}
      ></div>
      {loading && <p className="text-center text-gray-600">Loading shops...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {shops.length === 0 && !loading && !error && (
        <p className="text-center text-gray-600">
          No medicine shops found nearby.
        </p>
      )}
      <div className="grid gap-4">
        {shops.map((shop, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer ${
              selectedShop === index ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleShopClick(shop, index)}
          >
            <h2 className="text-lg font-semibold">{shop.placeName}</h2>
            <p className="text-gray-600">{shop.placeAddress}</p>
            <p className="text-gray-500">Distance: {shop.distance} meters</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyMedicineShops;
