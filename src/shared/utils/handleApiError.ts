import { toast } from 'react-toastify'

export function handleApiError(error: any, defaultMessage = 'Xatolik yuz berdi') {
  if (Array.isArray(error?.message)) {
    error.message.forEach((msg: string) => toast.error(msg));
  }
  if (Array.isArray(error?.image)) {
    error.image.forEach((msg: string) => toast.error(msg));
  } else if (typeof error?.message === "string") {
    toast.error(error.message);
  } else if (typeof error?.detail === "string") {
    toast.error(error.detail);
  } else if (typeof error?.error === "string") {
    toast.error(error.error);
  } else if (error?.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error(defaultMessage);
  }
}
