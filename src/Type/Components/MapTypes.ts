export interface MarkerData {
    position: [number, number]
    popupContent: string
}

export interface CustomSelectPositionMapProps {
    onPositionChange: (lat: number, lng: number) => void
    center?: [number, number]
    zoomLevel?: number
}

export interface DisplayPositionProps {
    map: any
    onPositionChange: (lat: number, lng: number) => void
}

export interface DisplayMapProps {
    center: [number, number]
    zoomLevel?: number
}

export interface CustomDisplayPositionMapProps {
    position: [number, number]
    zoomLevel?: number
    popUpMessage?: string
}
