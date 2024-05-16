import { useSelector } from 'react-redux'

const SidebarMenu = () => {
  const userData = useSelector((state: any) => state.user?.userData)

  let link
  let adminSubcategories

  switch (userData?.role?.name) {
    case 'CUSTOMER_ADMIN':
      link = '/permission'
      adminSubcategories = [
        {
          icon: '/assets/images/permission.svg',
          name: 'Permission',
          link: '/permission',
        },
        {
          icon: '/assets/images/settings.svg',
          name: 'Settings',
          link: '/permission',
        },
      ]
      break
    default:
      link = '/customerAdmin'
      adminSubcategories = [
        {
          icon: '/assets/images/customerOwner.svg',
          name: 'Customer Owner',
          link: '/customerAdmin',
        },
        {
          icon: '/assets/images/settings.svg',
          name: 'Settings',
          link: '/customerAdmin',
        },
      ]
      break
  }

  const menu = [
    {
      icon: '/assets/images/dashboard.svg',
      name: 'DASHBOARD',
      link: '/dashboard',
    },
    {
      icon: '/assets/images/ship.svg',
      name: 'MOORMANAGE',
      link: 'moormanage/customer',
      subcategories: [
        {
          icon: '/assets/images/customer.svg',
          name: 'Customer',
          link: 'moormanage/customer',
        },
        {
          icon: '/assets/images/moorings.svg',
          name: 'Moorings',
          link: 'moormanage/mooring',
        },
        {
          icon: '/assets/images/vendor.svg',
          name: 'Vendors',
          link: 'moormanage/vendors',
        },
        {
          icon: '/assets/images/technician.svg',
          name: 'Technicians',
          link: 'moormanage/technicians',
        },
        {
          icon: '/assets/images/boatYard.svg',
          name: 'Boatyards',
          link: 'moormanage/boatyards',
        },
      ],
    },
    {
      icon: '/assets/images/moorpay.svg',
      name: 'MOORPAY',
      link: 'moorpay/accountReceivable',
      subcategories: [
        {
          icon: '/assets/images/accReceivable.svg',
          name: 'Account Receivable',
          link: 'moorpay/accountReceivable',
        },
        {
          icon: '/assets/images/accPayable.svg',
          name: 'Account Payable',
          link: 'moorpay/accountPayable',
        },
      ],
    },
    {
      icon: '/assets/images/moorserve.svg',
      name: 'MOORSERVE',
      link: 'moorserve/workOrders',
      subcategories: [
        {
          icon: '/assets/images/forms.svg',
          name: 'Work Orders',
          link: 'moorserve/workOrders',
        },
        {
          icon: '/assets/images/estimates.svg',
          name: 'Estimates',
          link: 'moorserve/estimates',
        },
        {
          icon: '/assets/images/forms.svg',
          name: 'Forms',
          link: 'moorserve/forms',
        },
      ],
    },
    {
      icon: '/assets/images/tools.svg',
      name: 'ADMIN TOOLS',
      link: link,
      subcategories: adminSubcategories,
    },
  ]

  return menu
}

export default SidebarMenu
