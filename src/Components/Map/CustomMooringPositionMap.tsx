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

const CustomMooringPositionMap: React.FC<CustomMooringPositionMapProps> = ({
  position,
  zoomLevel,
  style,
  moorings,
  dashboard,
  customerPage,
  setLeftContainer,
  setRightContainer,
}) => {
  const [map, setMap] = useState<any>()
  const mapRef = useRef<any>(null)
  const [showMapModal, setShowMapModal] = useState(false)
  const [mapContainerWidth, setMapContainerWidth] = useState(false)

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

  const IncreaseMapContainerWidth = () => {
    setMapContainerWidth(true)
    setLeftContainer(true)
    setRightContainer(true)
  }

  const DecreaseMapContainerWidth = () => {
    setMapContainerWidth(false)
    setLeftContainer(false)
    setRightContainer(false)
  }

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

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: dashboard ? 'center' : 'flex-start',
    gap: dashboard ? '20px' : '2px',
  }

  const iconsByStatusId = {
    1: GearOnIcon,
    2: GearOffIcon,
    3: NeedInspectionIcon,
    4: NotInUseIcon,
  }

  return (
    <>
      {showMapModal ? (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            zIndex: 999999,
            top: 0,
            left: 0,
            overflow: 'auto',
            position: 'fixed',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: 'white',
              paddingRight: '3%',
            }}
            onClick={() => setShowMapModal(false)}>
            X
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}>
            <MapContainer
              ref={setMap}
              style={{ ...style, height: '80vh', width: '80vw' }}
              center={position}
              zoom={position ? zoomLevel : 4}
              scrollWheelZoom={false}
              attributionControl={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {moorings && customerPage
                ? moorings.map((mooring: MooringPayload, index: number) => {
                    const coordinates = parseCoordinates(mooring.gpsCoordinates) || [
                      41.56725, 70.94045,
                    ]
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
                  })
                : moorings &&
                  moorings.map((mooring: MooringWithGpsCoordinates, index: number) => {
                    const coordinates = parseCoordinates(mooring.gpsCoordinates) || [
                      41.56725, 70.94045,
                    ]
                    const position: LatLngExpression = coordinates
                    const iconKey = mooring?.statusId as keyof typeof iconsByStatusId
                    const icon = iconsByStatusId[iconKey] || DefaultIcon

                    return (
                      <>
                        <Marker key={index} position={position} icon={icon} ref={mapRef}>
                          <Popup>
                            <MooringMapModal
                              gpsValue={position}
                              mooringId={mooring?.mooringId}
                              mooringData={mooring}
                            />
                          </Popup>
                        </Marker>
                      </>
                    )
                  })}
            </MapContainer>
          </div>
        </div>
      ) : null}
      <div style={{ position: 'relative' }}>
        {/* style={{ resize: 'both', overflow: 'auto' }} */}
        <div
          onClick={() => {
            setShowMapModal(true)
            // mapContainerWidth ? DecreaseMapContainerWidth() : setRightContainer(true)
          }}
          className="p-2 h-8 w-8 mr-20"
          style={{ cursor: 'pointer', position: 'absolute', left: '95%', top: 0, zIndex: 999 }}>
          <img src="/assets/images/resize.png" alt="Key Icon" className="p-clickable" />
        </div>
        <div>
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

            {moorings && customerPage
              ? moorings.map((mooring: MooringPayload, index: number) => {
                  const coordinates = parseCoordinates(mooring.gpsCoordinates) || [
                    41.56725, 70.94045,
                  ]
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
                })
              : moorings &&
                moorings.map((mooring: MooringWithGpsCoordinates, index: number) => {
                  const coordinates = parseCoordinates(mooring.gpsCoordinates) || [
                    41.56725, 70.94045,
                  ]
                  const position: LatLngExpression = coordinates
                  const iconKey = mooring?.statusId as keyof typeof iconsByStatusId
                  const icon = iconsByStatusId[iconKey] || DefaultIcon

                  return (
                    <>
                      <Marker key={index} position={position} icon={icon} ref={mapRef}>
                        <Popup>
                          <MooringMapModal
                            gpsValue={position}
                            mooringId={mooring?.mooringId}
                            mooringData={mooring}
                          />
                        </Popup>
                      </Marker>
                    </>
                  )
                })}
          </MapContainer>
        </div>
      </div>

      {dashboard ? (
        <div style={boxStyle}>
          <h2>Status</h2>
          <div className="mt-1">
            <hr style={{ border: '1px solid #D5E1EA' }} />
          </div>
          <div style={containerStyle}>
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
              <span style={dotStyle('#d3d3d3')}></span> Not in Use
            </div>
          </div>
        </div>
      ) : (
        <div style={boxStyle}>
          <h2>Status</h2>
          <div className="mt-1">
            <hr style={{ border: '1px solid #D5E1EA' }} />
          </div>
          <div style={containerStyle}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <div>
                <span style={dotStyle('red')}></span> Need Inspection
              </div>
              <div>
                <span style={dotStyle('blue')}></span> Gear Off
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: dashboard ? '300px' : '80px',
              }}>
              <div>
                <span style={dotStyle('green')}></span> Gear On
              </div>
              <div>
                <span style={dotStyle('#d3d3d3')}></span> Not in Use
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomMooringPositionMap
