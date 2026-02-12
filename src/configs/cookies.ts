import Cookies from 'js-cookie'

export const setCookie = (name: string, data: any) => {
  Cookies.set(name, JSON.stringify(data))
}

export const getCookie = (name: string) => {
  const cookieUser = Cookies.get(name)
  try {
    return cookieUser ? JSON.parse(cookieUser) : ''
  } catch (err) {
    return cookieUser
  }
}

export const removeCookie = (name: string) => {
  Cookies.remove(name, { path: '' })
}
