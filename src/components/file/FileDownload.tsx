import { downloadFileByUrl } from "@/utils/file";
import { FileDownload as FileDownloadDone } from "@mui/icons-material";
import { Button } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

type FileDownloadProps = {
  name: string;
  title?: string;
};

function FileDownload({ name, title = "" }: FileDownloadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async () => {
    // const url = await getFileUrl(name);
    // try {
    //   downloadFileByUrl(url, name);
    // } catch (error) {
    //   console.error("Faylni yuklab olishda xatolik yuz berdi:", error);
    // }
  };
  return (
    <Button
      //   size="small"
      //   style={{ border: '1px solid #d9d9d9', color: '#555', fontWeight: 500 }}
      disabled={!name}
      onClick={downloadFile}
      icon={<FileDownloadDone style={{ fontSize: 18 }} />}
    >
      {title}
    </Button>
  );
}

export default FileDownload;
