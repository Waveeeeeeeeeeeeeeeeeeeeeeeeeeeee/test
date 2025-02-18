import { EnumRoutes } from './router.consts'
import { IRoute } from './router.types'
import { Home } from '@/2.pages'

export const bgRoutes: any = {
	[EnumRoutes.HOME]: '#FFC96A'
}

export const routes: IRoute[] = [
	{
		path: EnumRoutes.HOME,
		component: Home
	}
]
