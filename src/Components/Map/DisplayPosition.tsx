import { useCallback, useEffect, useState } from 'react'
import L from 'leaflet'
import './CustomMap.css'
import DefaultIcon from './DefaultIcon'
import { DisplayPositionProps } from '../../Type/Components/MapTypes'

const DisplayPosition: React.FC<DisplayPositionProps> = ({ map, onPositionChange }) => {
  const [position, setPosition] = useState(() => map.getCenter())

  const handlePositionChange = useCallback(() => {
    const newPosition = map.getCenter()
    setPosition(newPosition)
    if (onPositionChange) {
      onPositionChange(newPosition.lat, newPosition.lng)
    }
  }, [map, onPositionChange])

  useEffect(() => {
    const mapMoveListener = () => {
      handlePositionChange();
    };
    map.on('move', mapMoveListener);
    return () => {
      map.off('move', mapMoveListener);
    };
  }, [map, handlePositionChange, onPositionChange]);

  return <></>
}

L.Marker.prototype.options.icon = DefaultIcon

export default DisplayPosition
