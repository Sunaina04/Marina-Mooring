import L, { IconOptions } from 'leaflet'

const defaultIconOptions: IconOptions = {
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [40, 50],
}

export const DefaultIcon = L.icon(defaultIconOptions)

const gearOnIconOptions: IconOptions = {
  iconUrl: '/assets/images/GearOn.png',
  iconSize: [40, 50],
}

export const GearOnIcon = L.icon(gearOnIconOptions)

const gearOffIconOptions: IconOptions = {
  iconUrl: '/assets/images/GearOff.png',
  iconSize: [40, 50],
}

export const GearOffIcon = L.icon(gearOffIconOptions)

const notInUseIconOptions: IconOptions = {
  iconUrl: '/assets/images/NotInUse.png',
  iconSize: [40, 50],
}

export const NotInUseIcon = L.icon(notInUseIconOptions)

const needInspectionIconOptions: IconOptions = {
  iconUrl: '/assets/images/NeedInspection.png',
  iconSize: [40, 50],
}

export const NeedInspectionIcon = L.icon(needInspectionIconOptions)
