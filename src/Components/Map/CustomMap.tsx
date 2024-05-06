import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./CustomMap.css"

const CustomMap = () => {
  const position = [13.08462, 80.2483579]
  const [center, setCenter] = useState({ latitude: 13.084622, langitude: 80.248357 })
  const ZOOM_LEVEL = 9

  return (
    <MapContainer center={position} zoom={13}>
    <TileLayer
      // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
  )
}

export default CustomMap
