import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import { CustomDisplayPositionMapProps } from '../../Type/Components/MapTypes'
import { useEffect, useRef, useState } from 'react'
import { DefaultIcon } from './DefaultIcon'

const CustomDisplayPositionMap: React.FC<CustomDisplayPositionMapProps> = ({
  position,
  zoomLevel,
  style,
}) => {
  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '10px',
    marginTop: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }

  const dotStyle = (color: any) => ({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '10px',
  })

  const [map, setMap] = useState<any>()
  const markerRef = useRef(null)

  useEffect(() => {
    if (map && position) {
      map.setView(position)
    }
  }, [position, map])

  return (
    <>
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
      <div style={boxStyle}>
        <div>
          <span style={dotStyle('red')}></span> Need Inspection
        </div>
        <div>
          <span style={dotStyle('blue')}></span> Gear Off
        </div>
        <div>
          <span style={dotStyle('green')}></span> Gear On
        </div>
        <div>
          <span style={dotStyle('white')}></span> Not in Use
        </div>
      </div>
    </>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomDisplayPositionMap
