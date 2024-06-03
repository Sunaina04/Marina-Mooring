import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import { CustomMooringPositionMapProps } from '../../Type/Components/MapTypes'
import { useRef } from 'react'

const CustomMooringPositionMap: React.FC<CustomMooringPositionMapProps> = ({
  position,
  zoomLevel,
  popUpMessage,
  style,
  iconsByStatus,
  moorings,
}) => {
  const markerRef = useRef(null)

  return (
    <MapContainer
      style={style}
      center={position}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {moorings.map((mooring, index) => (
        <Marker key={index} position={mooring.position} icon={iconsByStatus[mooring.status]}>
          <Popup>{mooring.status}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

const DefaultIcon = L.icon({
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [40, 50],
})

export default CustomMooringPositionMap
