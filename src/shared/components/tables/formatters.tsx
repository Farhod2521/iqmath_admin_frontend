import { formatDate } from "@/shared/utils/formatDate";
import { Tag } from "antd";

const EMPTY_VALUE = "---";

export const formatValue = (value: any): string | React.ReactNode =>
  value || EMPTY_VALUE;

export const formatDateColumn = (dateString: string) => {
  if (!dateString) return EMPTY_VALUE;
  const date = new Date(dateString);

  const { minutes, hours, day, month, year } = formatDate(dateString);
  return (
    <div
      style={{ width: "140px" }}
      className="flex gap-2 items-center flex-nowrap"
    >
      {`${day}.${month}.${year}`}{" "}
      <Tag color="cyan">{`${hours}:${minutes}`}</Tag>
    </div>
  );
};
