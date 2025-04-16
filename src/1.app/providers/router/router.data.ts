import { Onboarding } from '@/2.pages/onboarding'
import { EnumRoutes } from './router.consts'
import { IRoute } from './router.types'
import  Home from '@/2.pages/home/ui/home'
import SearchPage from '@/2.pages/searchPage/ui/SearchPage'
import Friends from '@/2.pages/friends/ui/Friends'
import Profile from '@/2.pages/profile/ui/Profile'
import ProfileSettings from '@/2.pages/profileSettings/ui/ProfileSettings'
import ProfileGames from '@/2.pages/profileGames/ui/ProfileGames'
import ProfileSupport from '@/2.pages/profileSupport/ui/ProfileSupport'

export const bgRoutes: any = {
	[EnumRoutes.HOME]: '#FFC96A',
	[EnumRoutes.ONBOARDING]: '#FFC96A',
}

export const routes: IRoute[] = [
	{
		path: EnumRoutes.HOME,
		component: Home
	},
	{
		path: EnumRoutes.ONBOARDING,
		component: Onboarding
	},
	{
		path: EnumRoutes.SEARCH_DETAIL,
		component: SearchPage
	},
	{
		path: EnumRoutes.FRIENDS,
		component: Friends
	},
	{
		path: EnumRoutes.PROFILE,
		component: Profile,
	},
	{
		path: EnumRoutes.PROFILE_SETTINGS,
		component: ProfileSettings
	},
	{
		path: EnumRoutes.PROFILE_GAMES,
		component: ProfileGames
	},
	{
		path: EnumRoutes.PROFILE_SUPPORT,
		component: ProfileSupport
	}
	
]
