// components/GroupColumns.tsx
import { Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { MyGroupsData } from "../utils/types";

interface GroupColumnsProps {
  t: (key: string) => string;
  deletePending: boolean;
  onAddStudents: (row: MyGroupsData) => void;
  onEdit: (row: MyGroupsData) => void;
  onInfo: (row: MyGroupsData) => void;
  onDelete: (id: number) => void;
}

export const useGroupColumns = ({
  t,
  deletePending,
  onAddStudents,
  onEdit,
  onInfo,
  onDelete,
}: GroupColumnsProps): ColumnsType<MyGroupsData> => [
  { title: t("title"), dataIndex: "name", key: "name" },
  {
    title: t("students"),
    dataIndex: "students",
    key: "students",
    render: (students: any[]) => (
      <span>{Array.isArray(students) ? students.length : 0} ta</span>
    ),
  },
  {
    title: t("actions"),
    key: "actions",
    width: 140,
    render: (_: any, row: MyGroupsData) => (
      <Space>
        <Button
          //   type="primary"
          variant="outlined"
          onClick={() => onInfo(row)}
          icon={<InfoCircleOutlined />}
        />
        <Button
          type="primary"
          onClick={() => onAddStudents(row)}
          icon={<UserAddOutlined />}
        />
        <Button onClick={() => onEdit(row)} icon={<EditOutlined />} />
        <Popconfirm
          title="Guruhni o‘chirasizmi?"
          okText="Ha"
          cancelText="Yo‘q"
          onConfirm={() => onDelete(row.id)}
        >
          <Button danger loading={deletePending} icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    ),
  },
];
