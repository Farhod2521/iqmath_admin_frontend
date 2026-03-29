import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

type Props = {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  disabled?: boolean;
  maxSizeMB?: number;
  label?: string;
};

const SingleImageUpload = ({
  value = [],
  onChange,
  disabled = false,
  maxSizeMB = 5,
  label = "Rasm yuklash",
}: Props) => {
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Faqat rasm yuklash mumkin");
      return Upload.LIST_IGNORE;
    }

    const isLtMax = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLtMax) {
      message.error(`Rasm hajmi ${maxSizeMB}MB dan kichik bo‘lishi kerak`);
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    onChange?.(fileList.slice(-1));
  };

  return (
    <Upload
      accept="image/*"
      listType="picture-card"
      maxCount={1}
      beforeUpload={beforeUpload}
      fileList={value}
      onChange={handleChange}
      disabled={disabled}
    >
      {value.length >= 1 ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>{label}</div>
        </div>
      )}
    </Upload>
  );
};

export default SingleImageUpload;
