import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import DefaultIcon from './DefaultIcon'
import { CustomDisplayPositionMapProps } from '../../Type/Components/MapTypes'
import { useRef } from 'react'

const CustomDisplayPositionMap: React.FC<CustomDisplayPositionMapProps> = ({
  position,
  zoomLevel,
  popUpMessage,
}) => {
  const markerRef = useRef(null)
  return (
    <MapContainer
      center={position}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} ref={markerRef}>
        {/* <Popup>{popUpMessage}</Popup> */}
      </Marker>
    </MapContainer>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomDisplayPositionMap
