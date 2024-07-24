import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import './CustomMap.css'
import { CustomMooringPositionMapProps } from '../../Type/Components/MapTypes'
import {
  DefaultIcon,
  GearOffIcon,
  GearOnIcon,
  NeedInspectionIcon,
  NotInUseIcon,
} from './DefaultIcon'
import { MooringPayload, MooringWithGpsCoordinates } from '../../Type/ApiTypes'
import MooringMapModal from '../CustomComponent/MooringMapModal'
import { Toast } from 'primereact/toast'

const CustomDashboardMooringMap: React.FC<CustomMooringPositionMapProps> = ({
  position,
  zoomLevel,
  style,
  moorings,
  leftContanerWidth,
  setLeftContainer,
}) => {
  const [map, setMap] = useState<any>()
  const mapRef = useRef<any>(null)
  const [showMap, setShowMap] = useState(true)
  const [showMapModal, setShowMapModal] = useState(false)
  const toast = useRef<Toast>(null)

  const parseCoordinates = (coordinates: string): [number, number] | null => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  const handleOpenMap = () => {
    if (leftContanerWidth) {
      setLeftContainer(false)
    } else {
      setLeftContainer(true)
    }
  }

  const boxStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '33vw',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'absolute' as 'absolute',
    bottom: '10px',
    left: '50%',
    fontSize: '10px',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  }

  const dotStyle = (color: any): React.CSSProperties => ({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '10px',
  })

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '10px',
  }

  const iconsByStatusId = {
    1: GearOnIcon,
    2: GearOffIcon,
    3: NeedInspectionIcon,
    4: NotInUseIcon,
  }

  useEffect(() => {
    if (map && position) {
      map.setView(position)
    }
  }, [position, map])

  return (
    <>
      <Toast ref={toast} />
      <div style={{ position: 'relative' }}>
        <div
          onClick={() => {
            handleOpenMap()
          }}
          className="p-2 h-8 w-8 mr-20"
          style={{ cursor: 'pointer', position: 'absolute', left: '95%', top: 0, zIndex: 999 }}>
          <img src="/assets/images/resize.png" alt="Key Icon" className="p-clickable" />
        </div>
        <div>
          {showMap ? (
            <MapContainer
              ref={setMap}
              style={{ ...style, flexGrow: 1 }}
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
                  const coordinates = parseCoordinates(mooring.gpsCoordinates) || [
                    39.4926173, -117.5714859,
                  ]
                  const position: LatLngExpression = coordinates
                  const iconKey = mooring?.mooringStatus?.id as keyof typeof iconsByStatusId
                  const icon = iconsByStatusId[iconKey] || DefaultIcon

                  return (
                    <Marker key={index} position={position} icon={icon} ref={mapRef}>
                      <Popup>
                        <MooringMapModal
                          gpsValue={position}
                          mooringId={mooring?.mooringNumber}
                          mooringData={mooring}
                          showMapModal={showMapModal}
                        />
                      </Popup>
                    </Marker>
                  )
                })}
            </MapContainer>
          ) : null}
        </div>

        <div style={boxStyle}>
          <h2>Status</h2>
          <div className="mt-1">
            <hr style={{ border: '1px solid #3F3F3F' }} />
          </div>
          <div style={containerStyle}>
            <div>
              <span style={dotStyle('#ED4C3E')}></span> Need Inspection
            </div>
            <div>
              <span style={dotStyle('#8C0DD1')}></span> Gear Off (out of the water)
            </div>
            <div>
              <span style={dotStyle('#3BB15E')}></span> Gear On (in the water)
            </div>
            <div>
              <span style={dotStyle('#E9E9E9')}></span> Not in Use
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomDashboardMooringMap
