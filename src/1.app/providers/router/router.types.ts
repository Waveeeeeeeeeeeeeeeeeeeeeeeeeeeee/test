export interface IChildRoute {
	path: string
	element: React.ComponentType<any> 
  }

export interface IRoute {
  path: string
  component: React.ComponentType<any>
  children?: IChildRoute[]
}
