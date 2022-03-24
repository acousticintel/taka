export const points = [20, 40, 60, 80, 100]

export const routes = [
  { name: 'Profile', route: '/profile' },
  {
    name: 'History', route: '/history',
    list: [
      { name: 'Uploads', route: '/history' },
      { name: 'Coupons', route: '/history' },
    ]
  },
  { name: 'Offers', route: '/offers' },
]