export const getLocalStorage = (name: string) => {
  const local = localStorage.getItem(name)

  try {
    return local ? JSON.parse(local) : ''
  } catch (err) {
    return local
  }
}

export const setLocalStorge = <T>(name: string, data: T) => {
  localStorage.setItem(name, JSON.stringify(data))
}

export const removeStorge = (name: string) => {
  localStorage.removeItem(name)
}

export const allStorage = () => {
  let values = []
  let keys = Object.keys(localStorage)
  let i = keys.length

  while (i--) {
    values.push(localStorage.getItem(keys[i]))
  }
  return values
}

export const clearLocalStorageExcept = (keysToKeep: string[]) => {
  const allKeys = Object.keys(localStorage)
  allKeys.forEach((key) => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key)
    }
  })
}
