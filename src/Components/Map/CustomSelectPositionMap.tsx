import { LegacyRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import './CustomMap.css'
import DisplayPosition from './DisplayPosition'
import { CustomSelectPositionMapProps } from '../../Type/Components/MapTypes'
import { DefaultIcon } from './DefaultIcon'

// function SetViewOnClick(animateRef: any) {
//   const map = useMapEvent('click', (e) => {
//     map.setView(e.latlng, map.getZoom(), {
//       animate: animateRef.current || false,
//     })
//   })

//   return null
// }


interface ReCenterProps {
  center: LatLngExpression | undefined;
}

const RecenterAutomatically: React.FC<ReCenterProps> = (props) => {
  
  const center = props.center as LatLngExpression;

  const map = useMap();
   useEffect(() => {
    console.log("here ");
     map.setView(center);
   }, [center]);
   return null;
 }

const CustomSelectPositionMap: React.FC<CustomSelectPositionMapProps> = ({
  onPositionChange,
  center,
  zoomLevel,
  setCenter,
}) => {
  const [map, setMap] = useState<any>()
  const markerRef = useRef(null)
  const animateRef = useRef<any>(false)  

  const displayMap = useMemo(
    () => {
      return(
      <MapContainer center={center} zoom={zoomLevel} attributionControl={false} ref={setMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {console.log('resetting center', center)} */}
        <Marker
          // draggable={false}
          ref={markerRef}
          position={center ? center : [30.6983149, 76.656095]}></Marker>
          <RecenterAutomatically center={center}/>
      </MapContainer>
    )
  },
    [center],
  )

  return (
    <div>
      {map ? <DisplayPosition map={map} onPositionChange={onPositionChange} /> : null}
      {displayMap}
    </div>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomSelectPositionMap
