import L, { IconOptions } from 'leaflet'

const defaultIconOptions: IconOptions = {
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [200, 200],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
}

const DefaultIcon = L.icon(defaultIconOptions)

export default DefaultIcon
