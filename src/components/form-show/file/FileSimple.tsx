import { FormManagementType } from "../FormManagement";
import { Form } from "antd";
import { Button } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import { downloadBase64 } from "@/utils/file";

import { useMemo } from "react";
import FileShowIcon from "./FileShowIcon";

export default function FileSimple(props: FormManagementType) {
  const { data } = props;

  const downloadFile = async () => {
    let url = data?.value;
    // if (!url.includes("http")) {
    //   url = await getFileUrl(data?.value);
    // }
    downloadBase64(url, data?.label);
  };

  return (
    <Form.Item label={data.label}>
      <Button
        size="small"
        style={{ border: "1px solid #d9d9d9", color: "#555", fontWeight: 500 }}
        component="span"
        variant="outlined"
        onClick={downloadFile}
        startIcon={<FileDownload />}
      >
        Yuklab olish
      </Button>

      <FileShowIcon label={data.label} value={data.value} />
    </Form.Item>
  );
}
