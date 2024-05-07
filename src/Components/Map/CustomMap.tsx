import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import "./CustomMap.css"
import LeafletGeocoder from './LeafletGeoCoder';

const CustomMap = () => {
  const position = [31.633980, 74.872261]
  // const [center, setCenter] = useState({ latitude: 13.084622, langitude: 80.248357 })
  const ZOOM_LEVEL = 9

  return (
    <MapContainer center={position} zoom={ZOOM_LEVEL}>
    <TileLayer
      // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A Great Amritsar
      </Popup>
    </Marker>
  </MapContainer>
  )
}

let DefaultIcon = L.icon({
  iconUrl: "/assets/images/marker-icon.png",
  iconSize: [100, 100],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default CustomMap
