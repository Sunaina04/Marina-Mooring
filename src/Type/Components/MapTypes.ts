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
  position: LatLngExpression
  zoomLevel?: number
  popUpMessage?: string
}
