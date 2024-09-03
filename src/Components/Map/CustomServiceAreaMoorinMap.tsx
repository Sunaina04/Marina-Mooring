import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import './CustomMap.css'
import { CustomServiceAreaMoorinMapProps } from '../../Type/Components/MapTypes'
import {
  DefaultIcon,
  EastIcon,
  GearOffIcon,
  GearOnIcon,
  NeedInspectionIcon,
  NotInUseIcon,
} from './DefaultIcon'
import { MooringPayload } from '../../Type/ApiTypes'
import MooringMapModal from '../CustomComponent/MooringMapModal'
import { Toast } from 'primereact/toast'

const CustomServiceAreaMoorinMap: React.FC<CustomServiceAreaMoorinMapProps> = ({
  position,
  zoomLevel,
  style,
  moorings,
}) => {
  const [map, setMap] = useState<L.Map | null>(null)
  const mapRef = useRef<any>(null)
  const toast = useRef<Toast>(null)

  const parseCoordinates = (coordinates: string): [number, number] | null => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  const boxStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '20vw',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'absolute',
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
    marginTop: '5px',
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
        <div>
          <MapContainer
            ref={setMap}
            style={{ ...style, flexGrow: 1 }}
            center={position}
            zoom={10}
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
                      />
                    </Popup>
                  </Marker>
                )
              })}
          </MapContainer>
        </div>

        <div style={boxStyle}>
          <div className="flex justify-between h-8">
            <h2>Status</h2>
          </div>

          <div className="mt-1">
            <hr style={{ border: '1px solid #3F3F3F' }} />
          </div>

          <div style={containerStyle}>
            <div>
              <div>
                <span style={dotStyle('#ED4C3E')}></span> Need Inspection
              </div>
              <div>
                <span style={dotStyle('#3BB15E')}></span> Gear On (in the water)
              </div>
            </div>
            <div>
              <div>
                <span style={dotStyle('#8C0DD1')}></span> Gear Off (out of the water)
              </div>
              <div>
                <span style={dotStyle('#ffff00')}></span> Need Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomServiceAreaMoorinMap
