export const SidebarMenu = [
  {
    icon: '/assets/images/square.png',
    name: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: '/assets/images/square.png',
    name: 'MOORMANAGE',
    link: 'moormanage/customer',
    subcategories: [
      {
        icon: '/assets/images/square.png',
        name: 'Customer',
        link: 'moormanage/customer',
      },
      {
        icon: '/assets/images/square.png',
        name: 'Moorings',
        link: 'moormanage/mooring',
      },
      {
        icon: '/assets/images/square.png',
        name: 'Vendors',
        link: 'moormanage/vendors',
      },
      {
        icon: '/assets/images/square.png',
        name: 'Technicians',
        link: 'moormanage/technicians',
      },
      {
        icon: '/assets/images/square.png',
        name: 'Boatyards',
        link: 'moormanage/boatyards',
      },
      // {
      //   icon: "/assets/images/square.png",
      //   name: "Reports",
      //   link: "moormanage/reports",
      // },
    ],
  },
  {
    icon: '/assets/images/square.png',
    name: 'MOORPAY',
    link: 'moorpay/accountReceivable',
    subcategories: [
      {
        icon: '/assets/images/square.png',
        name: 'Account Receivable',
        link: 'moorpay/accountReceivable',
      },
      {
        icon: '/assets/images/square.png',
        name: 'Account Payable',
        link: 'moorpay/accountPayable',
      },
      // {
      //   icon: "/assets/images/square.png",
      //   name: "Reports",
      //   link: "moorpay/reports",
      // },
    ],
  },
  {
    icon: '/assets/images/square.png',
    name: 'MOORSERVE',
    link: 'moorserve/workOrders',
    subcategories: [
      {
        icon: '/assets/images/square.png',
        name: 'Work Orders',
        link: 'moorserve/workOrders',
      },
      {
        icon: '/assets/images/square.png',
        name: 'Estimates',
        link: 'moorserve/estimates',
      },
      // {
      //   icon: "/assets/images/square.png",
      //   name: "Time cards",
      //   link: "moorserve/timeCards",
      // },
      {
        icon: '/assets/images/square.png',
        name: 'Forms',
        link: 'moorserve/forms',
      },
      // {
      //   icon: "/assets/images/square.png",
      //   name: "Reports",
      //   link: "moorserve/reports",
      // },
    ],
  },
  {
    icon: '/assets/images/square.png',
    name: 'ADMIN TOOLS',
    link: 'admin/login',
    subcategories: [
      {
        icon: '/assets/images/square.png',
        name: 'Permission',
        link: '/permission',
      },
    ],
  },
]
