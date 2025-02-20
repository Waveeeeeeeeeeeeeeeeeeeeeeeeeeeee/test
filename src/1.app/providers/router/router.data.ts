import { Onboarding } from '@/2.pages/onboarding'
import { EnumRoutes } from './router.consts'
import { IRoute } from './router.types'
import { Home } from '@/2.pages'
import { AccountInfo } from '@/2.pages/accountinfo'

export const bgRoutes: any = {
	[EnumRoutes.HOME]: '#FFC96A',
	[EnumRoutes.ONBOARDING]: '#FFC96A',
	[EnumRoutes.ACCOUNT_INFO]: '#FFC96A'
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
		path: EnumRoutes.ACCOUNT_INFO,
		component: AccountInfo
	}
]
