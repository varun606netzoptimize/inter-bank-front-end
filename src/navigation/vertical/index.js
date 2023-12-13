const navigation = () => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',
      badgeColor: 'error',
      path: '/dashboards/analytics'
    },
    {
      title: 'User',
      icon: 'tabler:user',
      path: '/apps/user/list'
    },
    {
      title: 'Manage Bank',
      icon: 'tabler:building',
      path: '/apps/bank/list'
    },
    {
      title: 'Manage Loan Requests',
      icon: 'tabler:currency-dollar',
      path: '/apps/bank/requests'
    }
  ]
}

export default navigation
