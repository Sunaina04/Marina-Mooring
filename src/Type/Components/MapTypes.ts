import { LatLngExpression } from 'leaflet'

type MarkerPosition = [number, number]

export interface MarkerData {
  position: MarkerPosition
  popupContent: string
}

export interface CustomSelectPositionMapProps {
  onPositionChange: (lat: number, lng: number) => void
  center: LatLngExpression | undefined
  setCenter: React.Dispatch<React.SetStateAction<LatLngExpression | undefined>>
  zoomLevel: number
}

export interface DisplayPositionProps {
  map: any
  onPositionChange: (lat: number, lng: number) => void
}

export interface DisplayMapProps {
  center: LatLngExpression
  zoomLevel?: number
}

export interface CustomDisplayPositionMapProps {
  style?: React.CSSProperties
  position: LatLngExpression | any
  markerPostion?: LatLngExpression
  zoomLevel?: number
  popUpMessage?: string
}

export interface LatLngExpressionValue {
  lat: number
  lng: number
}

export interface Mooring {
  position: any[]
  status: string
}

export interface CustomMooringPositionMapProps extends CustomDisplayPositionMapProps {
  iconsByStatus?: { [key: string]: L.Icon }
  moorings?: any
}
