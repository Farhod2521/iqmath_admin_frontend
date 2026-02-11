import { Item, MenuItem } from '@/router/index.d'

export default (menus: Array<MenuItem>) => {
  // const childRoutes: Array<Item> = []
  // menus.forEach((ele) => {
  //   if (ele && ele.children) {
  //     ele.children.forEach((item) => {
  //       item.name = item.key
  //     })

  //     childRoutes.push(...ele.children.filter((i: Item) => i.component))
  //   } else {
  //     if (ele && ele.component) childRoutes.push({ ...ele, name: ele.key })
  //   }
  // })

  const childRoutes: Array<Item> = []

  const traverse = (nodes: Array<MenuItem | Item>) => {
    nodes.forEach((node) => {
      if (!node) return

      if ('children' in node && Array.isArray(node.children)) {
        node.children.forEach((child) => {
          child.name = child.key
        })

        traverse(node.children)
      }

      if (node.component) {
        childRoutes.push({ ...node, name: node.key })
      }
    })
  }

  traverse(menus)
  return childRoutes
}
