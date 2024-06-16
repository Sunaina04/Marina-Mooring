import { LegacyRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L, { Map } from 'leaflet'
import './CustomMap.css'
import DisplayPosition from './DisplayPosition'
import { CustomSelectPositionMapProps } from '../../Type/Components/MapTypes'
import { DefaultIcon } from './DefaultIcon'

const CustomSelectPositionMap: React.FC<CustomSelectPositionMapProps> = ({
  onPositionChange,
  center,
  zoomLevel,
  setCenter,
}) => {
  const [map, setMap] = useState<any>()
  const markerRef = useRef(null)

  useEffect(() => {
    if (map) {
      // Now you have access to the map instance
      console.log(map.getCenter()) // Example: log the current center of the map
    }
  }, [map])

  const displayMap = useMemo(
    () => (
      <MapContainer center={center} zoom={zoomLevel} attributionControl={false} ref={setMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {console.log('resetting center', center)} */}
        <Marker
          // draggable={false}
          ref={markerRef}
          position={center ? center : [30.6983149, 76.656095]}></Marker>
      </MapContainer>
    ),
    [center],
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
