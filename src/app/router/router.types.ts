export interface IChildRoute {
  path: string;
  element: React.ComponentType<unknown>;
}

export interface IRoute {
  path: string;
  component: React.ComponentType<object>;
  children?: IChildRoute[];
}