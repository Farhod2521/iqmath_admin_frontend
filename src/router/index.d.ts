export interface Item {
  key?: string
  path?: string
  name?: string
  icon?: any
  keyPath?: any
  label: string
  component?: any
}

export interface MenuItem extends Item {
  children?: Array<Item>
}

export interface router {
  path: string
  name: string
  component: any
  children?: Array<router>
}
