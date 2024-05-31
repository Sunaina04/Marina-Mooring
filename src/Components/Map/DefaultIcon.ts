import L, { IconOptions } from 'leaflet'

const defaultIconOptions: IconOptions = {
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [200, 200],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
}

const DefaultIcon = L.icon(defaultIconOptions)

export default DefaultIcon
