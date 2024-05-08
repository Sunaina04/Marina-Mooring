import { useMemo, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import DisplayPosition from './DisplayPosition'
import { CustomStateMapProps } from '../../Type/ComponentBasedType'
import DefaultIcon from './DefaultIcon'

const CustomSelectPositionMap: React.FC<CustomStateMapProps> = ({
  onPositionChange,
  center = [31.63398, 74.87226],
  zoomLevel = 13,
}) => {
  const [map, setMap] = useState()

  const displayMap = useMemo(
    () => (
      <MapContainer center={center} zoom={zoomLevel} scrollWheelZoom={false}>
        <TileLayer url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}" />
        <Marker position={center} />
      </MapContainer>
    ),
    [],
  )
  return (
    <div>
      {map ? <DisplayPosition map={map} onPositionChange={onPositionChange} /> : null}
      {displayMap}
    </div>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomSelectPositionMap
