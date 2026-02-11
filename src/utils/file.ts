export const base64ToBlob = (base64String: string, type: string) => {
  const byteCharacters = window.atob(base64String);
  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([byteArray], { type });
  return blob;
};

export const blobToFile = (blob: Blob, fileName: string) => {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  link.remove();
};

export const downloadBase64 = async (content: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = content;
  link.download = fileName;
  link.click();
  link.remove();
};

export const downloadFileByUrl = async (url: string, name: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Tarmoq bilan aloqa yaxshi emas edi!");
  }
  const blob = await response.blob();
  const link = document.createElement("a");
  const urlBlob = URL.createObjectURL(blob);
  link.href = urlBlob;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(urlBlob);
};

export const linkBase64 = (base64: string) => {
  return `data:image/png;base64,${base64}`;
};

export function getFilenameFromContentDisposition(
  contentDisposition?: string,
): string {
  let filename = "unknown";

  if (!contentDisposition) {
    return filename;
  }

  const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i.exec(
    contentDisposition,
  );
  if (match && match[1]) {
    filename = match[1].replace(/['"]/g, "");
  }

  return filename;
}

export const FILE_URL = import.meta.env.VITE_BACKEND_FILE_URI;
export const FILE_URL_UZKAD = import.meta.env.VITE_BACKEND_UZKAD_FILE_URL;
export const FILE_VIEW_URL =
  import.meta.env.VITE_BACKEND_URI + "/api/v1/files/view?fileName=";
// utils/getFileUrl.ts
// import { getFilesDownloadLink } from '@/http'
import { toast } from "react-toastify";

// export const getFileUrl = (name: string) => {
//   return getFilesDownloadLink(name)
//     .then((res) => res?.downloadUrl)
//     .catch((err) => {
//       toast.error(err?.message || 'Yuklab olish havolasini olishda xatolik yuz berdi')
//       return ''
//     })
// }
