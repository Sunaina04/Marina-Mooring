import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { Map } from 'leaflet'
import './CustomMap.css'
import { CustomDisplayPositionMapProps } from '../../Type/Components/MapTypes'
import { LegacyRef, useEffect, useRef, useState } from 'react'
import { DefaultIcon } from './DefaultIcon'

const CustomDisplayPositionMap: React.FC<CustomDisplayPositionMapProps> = ({
  position,
  zoomLevel,
  popUpMessage,
  style,
}) => {
  const [map, setMap] = useState<any>()
  const markerRef = useRef(null)

  useEffect(() => {
    if (map && position) {
      map.setView(position)
    }
  }, [position, map])

  return (
    <MapContainer
      style={style}
      center={position}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      attributionControl={false}
      ref={setMap}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} ref={markerRef}></Marker>
    </MapContainer>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomDisplayPositionMap
