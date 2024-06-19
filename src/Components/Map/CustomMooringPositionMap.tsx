import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression, LatLngBounds } from 'leaflet'
import './CustomMap.css'
import { CustomMooringPositionMapProps } from '../../Type/Components/MapTypes'
import {
  DefaultIcon,
  GearOffIcon,
  GearOnIcon,
  NeedInspectionIcon,
  NotInUseIcon,
} from './DefaultIcon'
import { MooringPayload } from '../../Type/ApiTypes'

const CustomMooringPositionMap: React.FC<CustomMooringPositionMapProps> = ({
  position,
  zoomLevel,
  popUpMessage,
  style,
  moorings,
}) => {
  const mapRef = useRef<any>(null)

  // useEffect(() => {
  //   if (mapRef.current && moorings && moorings.length > 0) {
  //     // let bounds = new LatLngBounds()

  //     moorings.forEach((mooring: MooringPayload) => {
  //       const coordinates = parseCoordinates(mooring.gpsCoordinates)
  //       if (coordinates) {
  //         bounds.extend(coordinates)
  //       }
  //     })

  //     mapRef.current.leafletElement.fitBounds(bounds, { padding: [50, 50] })
  //   }
  // }, [moorings])

  const parseCoordinates = (coordinates: string): [number, number] | null => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  const iconsByStatusId = {
    1: GearOnIcon,
    2: GearOffIcon,
    3: NeedInspectionIcon,
    4: NotInUseIcon,
  }

  return (
    <MapContainer
      ref={mapRef}
      style={style}
      center={position}
      zoom={position ? zoomLevel : 4}
      scrollWheelZoom={false}
      attributionControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {moorings &&
        moorings.map((mooring: MooringPayload, index: number) => {
          const coordinates = parseCoordinates(mooring.gpsCoordinates) || [41.56725, 70.94045]
          const position: LatLngExpression = coordinates
          const iconKey = mooring?.mooringStatus?.id as keyof typeof iconsByStatusId
          const icon = iconsByStatusId[iconKey] || DefaultIcon

          console.log('Mooring ID:', mooring.mooringId)
          console.log('Coordinates:', position)
          // console.log('Icon:', icon)

          return (
            <Marker key={index} position={position} icon={icon} ref={mapRef}>
              <Popup>
                <span>{popUpMessage || `Mooring ID: ${mooring.mooringId}`}</span>
              </Popup>
            </Marker>
          )
        })}
    </MapContainer>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomMooringPositionMap
