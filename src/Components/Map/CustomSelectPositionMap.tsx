import { LegacyRef, MutableRefObject, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L, { Map } from 'leaflet'
import './CustomMap.css'
import DisplayPosition from './DisplayPosition'
import DefaultIcon from './DefaultIcon'
import { CustomSelectPositionMapProps } from '../../Type/Components/MapTypes'

const CustomSelectPositionMap: React.FC<CustomSelectPositionMapProps> = ({
  onPositionChange,
  center,
  zoomLevel,
  setCenter,
}) => {
  const [map, setMap] = useState<LegacyRef<Map> | undefined>()
  const markerRef = useRef(null)

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setCenter(e.latlng)
      },
    })
    return null
  }

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoomLevel}
        attributionControl={false}
        // @ts-expect-error
        ref={setMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker draggable={false} ref={markerRef} position={center || [30.6983149, 76.656095]} />
        <MapClickHandler />
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
