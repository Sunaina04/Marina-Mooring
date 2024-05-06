import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CustomMap = () => {
  const position = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={13} style={{ width: '100%', height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CustomMap;