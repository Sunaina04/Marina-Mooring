import { useCallback, useEffect, useState } from 'react'
import L from 'leaflet'
import './CustomMap.css'
import { DisplayPositionProps } from '../../Type/ComponentBasedType'

const center = [31.63398, 74.87226]
const zoom = 13

const DisplayPosition: React.FC<DisplayPositionProps> = ({ map, onPositionChange }) => {
  const [position, setPosition] = useState(() => map.getCenter())

  const onMove = useCallback(() => {
    const newPosition = map.getCenter()
    setPosition(newPosition)
    if (onPositionChange) {
      onPositionChange(newPosition.lat, newPosition.lng)
    }
  }, [map, onPositionChange])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return <></>
}

let DefaultIcon = L.icon({
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [100, 100],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
})
L.Marker.prototype.options.icon = DefaultIcon

export default DisplayPosition
