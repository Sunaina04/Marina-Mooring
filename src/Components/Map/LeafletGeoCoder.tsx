import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-control-geocoder"; // Import the Leaflet Geocoder control
import { useMap } from "react-leaflet";

const LeafletGeocoder = () => {
  const map = useMap();

  // useEffect(() => {
  //   // Create the geocoder control instance
  //   const geocoder = L.Control.geocoder({
  //     defaultMarkGeocode: false,
  //   }).on("markgeocode", function (e : any) {
  //     var latlng = e.geocode.center;
  //     L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
  //     map.fitBounds(e.geocode.bbox);
  //   });

  //   // Add the geocoder control to the map
  //   geocoder.addTo(map);

  //   return () => {
  //     // Remove the geocoder control when the component is unmounted
  //     geocoder.remove();
  //   };
  // }, [map]);

  return null;
};

export default LeafletGeocoder;
