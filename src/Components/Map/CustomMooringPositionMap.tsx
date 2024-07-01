import React, { useEffect, useRef, useState } from 'react'
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
import { FaCircle } from 'react-icons/fa'
import Timeline from '../CustomComponent/MooringMapModal'
import MooringMapModal from '../CustomComponent/MooringMapModal'

const CustomMooringPositionMap: React.FC<CustomMooringPositionMapProps> = ({
  position,
  zoomLevel,
  popUpMessage,
  style,
  moorings,
}) => {
  const [map, setMap] = useState<any>()
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (map && position) {
      map.setView(position)
    }
  }, [position, map])

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
    <>
      <MapContainer
        ref={setMap}
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

            return (
              <>
                <Marker key={index} position={position} icon={icon} ref={mapRef}>
                  <Popup>
                    <MooringMapModal
                      gpsValue={position}
                      mooringId={mooring?.mooringNumber}
                      mooringData={mooring}
                    />
                  </Popup>
                </Marker>
              </>
            )
          })}
      </MapContainer>

      {/* <div className="rounded-md border-[1px] p-1 border-gray-300 w-[17vw] h-[13vh] bg-white">
        <p className="text-[0.7rem] ml-1  text-black">Status</p>
        <hr className="m-1 border-black" />
        <div className="flex">
          <div>
            <FaCircle className="h-3 text-red-600 mt-1" />
            <FaCircle className="h-3 text-green-600 mt-4" />
          </div>
          <div>
            <p className="text-[0.6rem] text-black mt-1">Need inspection</p>
            <p className="text-[0.6rem] text-black tracking-tighter mt-[0.9rem]">
              Gear On (in the water)
            </p>
          </div>
          <div className="ml-1">
            <FaCircle className="h-3 text-violet-600 mt-1 " />
            <FaCircle className="h-3 text-gray-500 mt-4" />
          </div>
          <div>
            <p className="text-[0.6rem] text-black tracking-tighter mt-1">
              Gear Off (out of the water)
            </p>
            <p className="text-[0.6rem] text-black tracking-tighter mt-[0.9rem]">Not in Use</p>
          </div>
        </div>
      </div> */}
    </>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomMooringPositionMap
