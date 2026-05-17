import { Button, Space, Popconfirm, Tag, Tooltip, Popover, Avatar } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { MyGroupsData, StudentsType } from "../services";

interface GroupColumnsProps {
  t: (key: string) => string;
  deletingId: number | null;
  onAddStudents: (row: MyGroupsData) => void;
  onEdit: (row: MyGroupsData) => void;
  onInfo: (row: MyGroupsData) => void;
  onDelete: (id: number) => void;
}

export const useGroupColumns = ({
  t,
  deletingId,
  onAddStudents,
  onEdit,
  onInfo,
  onDelete,
}: GroupColumnsProps): ColumnsType<MyGroupsData> => [
  {
    title: t("scoreLog.tR"),
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: t("groupName"),
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: t("tutor"),
    dataIndex: "teacher_name",
    key: "teacher_name",
    ellipsis: true,
    render: (val: string) => <b>{val}</b>,
  },

  {
    title: t("studentsCount"),
    dataIndex: "student_count",
    key: "student_count",
    align: "center",
    render: (count: number) => (
      <Tag color="blue">
        {count} {t("ta")}
      </Tag>
    ),
  },
  {
    title: t("students"),
    dataIndex: "students",
    key: "students",
    render: (students: StudentsType[]) => {
      if (!students || students.length === 0) {
        return <span>-</span>;
      }

      const preview = students.slice(0, 2); // faqat 2 ta ko‘rsatamiz

      return (
        <Popover
          title={t("students")}
          trigger="click"
          content={
            <div style={{ maxHeight: 250, overflowY: "auto", minWidth: 200 }}>
              {students.map((s) => (
                <Space key={s.id} style={{ display: "flex", marginBottom: 8 }}>
                  <Avatar>{s.full_name?.[0]}</Avatar>
                  <div>
                    <div style={{ fontWeight: 500 }}>{s.full_name}</div>
                    <div style={{ fontSize: 12, color: "#999" }}>
                      {s.identification}
                    </div>
                  </div>
                </Space>
              ))}
            </div>
          }
        >
          <div style={{ cursor: "pointer" }}>
            {/* preview list */}
            <div style={{ marginTop: 4 }}>
              {preview.map((s) => (
                <Tag key={s.id}>{s.full_name}</Tag>
              ))}

              {students.length > 2 && <Tag>+{students.length - 2}</Tag>}
            </div>
          </div>
        </Popover>
      );
    },
  },

  {
    title: t("actions"),
    key: "actions",
    width: 180,
    align: "center",
    render: (_: any, row: MyGroupsData) => (
      <Space size="small">
        <Tooltip title={t("details")}>
          <Button icon={<InfoCircleOutlined />} onClick={() => onInfo(row)} />
        </Tooltip>

        <Tooltip title={t("adding")}>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => onAddStudents(row)}
          />
        </Tooltip>

        <Tooltip title={t("update")}>
          <Button icon={<EditOutlined />} onClick={() => onEdit(row)} />
        </Tooltip>

        <Popconfirm
          title={t("deleteConfirm")}
          okText={t("yes")}
          cancelText={t("no")}
          onConfirm={() => onDelete(row.id)}
        >
          <Tooltip title={t("delete")}>
            <Button
              danger
              loading={deletingId === row.id}
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Popconfirm>
      </Space>
    ),
  },
];
