import { toast } from 'react-toastify'

export function handleApiError(error: any, defaultMessage = 'Xatolik yuz berdi') {
  if (Array.isArray(error?.message)) {
    error.message.forEach((msg: string) => toast.error(msg))
  } else if (typeof error?.message === 'string') {
    toast.error(error.message)
  } else if (error?.response?.data?.message) {
    toast.error(error.response.data.message)
  } else {
    toast.error(defaultMessage)
  }
}
