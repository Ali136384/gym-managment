"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function MyComponent({ height, width }) {
  const containerStyle = {
    width,
    height,
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const markerPosition = {
    lat: -3.745,
    lng: -38.523,
  };

  const [destinationLat, setDestinationLat] = useState(48.858844);
  const [destinationLng, setDestinationLng] = useState(2.29435);

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = () => {
    // Open Google Maps with directions
    if (destinationLat && destinationLng && lat && lng) {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&origin=${lat},${lng}`;
      open(directionsUrl, "_blank");
    }
  };

  return isLoaded ? (
    <div className=" z-50">
      <GoogleMap
        className="z-40"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Marker component to add a location */}
        <Marker position={markerPosition} onClick={handleMarkerClick} />
        {/* Child components, such as additional markers, info  s, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
