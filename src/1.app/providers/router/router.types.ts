import { ComponentType} from 'react'

export interface IRoute {
	path: string
	component: ComponentType<any>
	children?: {
		path: string
		element: ComponentType<any>
	}[]
}
