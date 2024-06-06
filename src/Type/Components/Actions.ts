export const toggleDrawer = () => ({
  type: 'TOGGLE_DRAWER',
})

export const toggleSubDrawer = (index: any) => ({
  type: 'TOGGLE_SUB_DRAWER',
  payload: index,
})

export interface SidebarState {
  isOpen: boolean
}
