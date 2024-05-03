import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapProps } from '../../Type/CommonType'

const CustomMap: React.FC<MapProps> = ({ marker }) => {
  const center = [10.178111119, 106.1787402874031]

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ width: '100vw', height: '100vw' }}></MapContainer>
  )
}

export default CustomMap
