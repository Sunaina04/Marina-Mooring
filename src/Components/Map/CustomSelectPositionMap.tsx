import { useMemo, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import DisplayPosition from './DisplayPosition'
import { CustomStateMapProps } from '../../Type/ComponentBasedType'

const CustomStateMap: React.FC<CustomStateMapProps> = ({
  onPositionChange,
  center = [31.63398, 74.87226],
  zoomLevel = 13,
}) => {
  const [map, setMap] = useState()

  const displayMap = useMemo(
    () => (
      <MapContainer center={center} zoom={zoomLevel} scrollWheelZoom={false} ref={setMap}>
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

let DefaultIcon = L.icon({
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [100, 100],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
})
L.Marker.prototype.options.icon = DefaultIcon

export default CustomStateMap
