import { Onboarding } from '@/2.pages/onboarding'
import { EnumRoutes } from './router.consts'
import { IRoute } from './router.types'
import  Home from '@/2.pages/home/ui/home'
import SearchPage from '@/2.pages/searchPage/ui/SearchPage'

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
	}
]
