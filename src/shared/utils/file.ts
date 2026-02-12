export const base64ToBlob = (base64String: string, type: string) => {
  const byteCharacters = window.atob(base64String)
  const byteArray = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i)
  }
  const blob = new Blob([byteArray], { type })
  return blob
}

export const blobToFile = (blob: Blob, fileName: string) => {
  const file = new File([blob], fileName, { type: blob.type })
  return file
}

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  link.remove()
}

export const downloadBase64 = async (content: string, fileName: string) => {
  const link = document.createElement('a')
  link.href = content
  link.download = fileName
  link.click()
  link.remove()
}

export const linkBase64 = (base64: string) => {
  return `data:image/png;base64,${base64}`
}

export function getFilenameFromContentDisposition(contentDisposition?: string): string {
  let filename = 'unknown'

  if (!contentDisposition) {
    return filename
  }

  const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i.exec(contentDisposition)
  if (match && match[1]) {
    filename = match[1].replace(/['"]/g, '')
  }

  return filename
}
