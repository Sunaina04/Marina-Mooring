import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import { CustomMooringPositionMapProps } from '../../Type/Components/MapTypes'
import { useRef } from 'react'

const CustomMooringPositionMap: React.FC<CustomMooringPositionMapProps> = ({
  position,
  zoomLevel,
  popUpMessage,
  style,
  iconsByStatus,
  moorings,
}) => {
  const markerRef = useRef(null)
  console.log(
    'mooring',
    moorings.map((mooring: any, index) => mooring.position[0]),
  )

  return (
    <MapContainer
      style={style}
      center={position}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      attributionControl={false}
      // zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {moorings.map((mooring: any, index) => (
        <Marker key={index} position={mooring.position} icon={iconsByStatus[mooring.status]}>
          <Popup>
            {
              <div>
                <div className="w-[12vw] ml-7 p-1 bg-black rounded-lg flex">
                  <div>
                    {/* <h2 className="text-lg font-bold text-white">{mooring.name}</h2> */}
                    <p className="text-[0.6rem] tracking-tighter text-white">Suncatcher</p>
                    <p className="text-xs tracking-tighter text-white mt-2">GPS Cordinates:</p>
                    <p className="text-xs tracking-tighter text-white">{mooring?.position}</p>
                  </div>
                  <div className="text-xs tracking-tighter text-white">
                    <p className="bg-gray-300 text-black  cursor-pointer" onClick={() => {}}>
                      View/edit
                    </p>
                    <p className="mt-1">ID:#4645</p>
                  </div>
                </div>
              </div>
            }
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

const DefaultIcon = L.icon({
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [40, 50],
})

export default CustomMooringPositionMap
