import { Breadcrumb } from 'antd'

type NavbarBreadProps = {
  width: number
}

const roleList: { superadmin: string; observer: string } = {
  superadmin: 'Admin',
  observer: 'Kuzatuvchi'
}

function NavbarBread({ width }: NavbarBreadProps) {
  const role = () => {
    for (const [key, value] of Object.entries(roleList)) {
      return value
      // if (key === basicStore.baseAuth.userInfo.role) return value
    }
  }

  const breadItems = [
    {
      title: role()
    }
  ]

  return <>Main</>
}

export default NavbarBread
