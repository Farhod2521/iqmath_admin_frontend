export interface Item {
  key: string
  path?: string
  name?: string
  icon?: any
  keyPath?: any
  label: string
}

export interface MenuItem extends Item {
  children?: MenuItem[]
}

export interface Router {
  path: string
  name: string
  children?: Router[]
}
