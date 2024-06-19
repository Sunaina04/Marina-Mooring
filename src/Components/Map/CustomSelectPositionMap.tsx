import { LegacyRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import './CustomMap.css'
import DisplayPosition from './DisplayPosition'
import { CustomSelectPositionMapProps } from '../../Type/Components/MapTypes'
import { DefaultIcon } from './DefaultIcon'

const CustomSelectPositionMap: React.FC<CustomSelectPositionMapProps> = ({
  onPositionChange,
  center,
  zoomLevel,
}) => {
  const [map, setMap] = useState<any>()
  const markerRef = useRef(null)

  useEffect(() => {
    if (map && center) {
      map.setView(center)
    }
  }, [center, map])

  const displayMap = useMemo(() => {
    return (
      <MapContainer center={center} zoom={zoomLevel} attributionControl={false} ref={setMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          ref={markerRef}
          position={center ? center : [30.6983149, 76.656095]}
          icon={DefaultIcon}></Marker>
      </MapContainer>
    )
  }, [center, zoomLevel])

  return (
    <div>
      {map ? <DisplayPosition map={map} onPositionChange={onPositionChange} /> : null}
      {displayMap}
    </div>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomSelectPositionMap
