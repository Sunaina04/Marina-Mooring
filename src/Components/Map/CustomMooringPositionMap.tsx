import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import './CustomMap.css'
import { CustomMooringPositionMapProps } from '../../Type/Components/MapTypes'
import { useRef } from 'react'
import { DefaultIcon, GearOffIcon } from './DefaultIcon'

const CustomMooringPositionMap: React.FC<CustomMooringPositionMapProps> = ({
  position,
  zoomLevel,
  popUpMessage,
  style,
  iconsByStatus,
  moorings,
}) => {
  const markerRef = useRef(null)

  const parseCoordinates = (coordinates: string): [number, number] | null => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  console.log(
    'iconsByStatus ? iconsByStatus[mooring.mooringStatus.id]',
    iconsByStatus,
    // iconsByStatus?.[moorings.mooringStatus.id],
  )
  // console.log('moorings', moorings[0].mooringStatus, moorings[0].mooringStatus.id)

  return (
    <MapContainer
      style={style}
      center={position as LatLngExpression}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      attributionControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {moorings &&
        moorings.map((mooring: any, index: any) => {
          const coordinates = parseCoordinates(mooring.gpsCoordinates) || [34.089, 76.157]
          const position: LatLngExpression = coordinates

          return (
            <Marker
              key={index}
              position={position}
              icon={GearOffIcon}
              // icon={iconsByStatus ? iconsByStatus[mooring.mooringStatus.id] : DefaultIcon}
              ref={markerRef}>
              <Popup>
                <span>{popUpMessage || `Mooring ID: ${mooring.mooringId}`}</span>
              </Popup>
            </Marker>
          )
        })}
    </MapContainer>
  )
}

// L.Marker.prototype.options.icon = DefaultIcon

export default CustomMooringPositionMap
