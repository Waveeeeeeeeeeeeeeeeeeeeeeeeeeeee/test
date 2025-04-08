import HomeIcon from '../../../6.shared/assets/icons/Home.svg?react'
import SearchIcon from '../../../6.shared/assets/icons/Search.svg?react'
import FriendsIcon from '../../../6.shared/assets/icons/Friends.svg?react'


export const navigationItems = [
    {
      label: 'Главная',
      path: '/',
      icon: HomeIcon,
    },
    {
      label: 'Поиск',
      path: '/search',
      icon: SearchIcon,
    },
    {
      label: 'Друзья',
      path: '/friends',
      icon: FriendsIcon,
    },
    {
      label: 'Профиль',
      path: '/profile',
      isProfile: true,
    },
  ]