import { useCallback, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Divider,
  Empty,
  Tooltip,
  Popover,
  List,
  Tag,
  Spin,
  Space,
} from "antd";
import { BellOutlined, BellFilled, CheckOutlined } from "@ant-design/icons";
import {
  getNotificationMe,
  NotificationData,
  patchNotification,
} from "../../services/notifiactions";
import {
  MdOutlineNotificationsActive,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { selectedUserData, useStoreUsers } from "@/store";
import { FiExternalLink } from "react-icons/fi";

const formatTimeAgo = (createdAt: string) => {
  const diff = Date.now() - new Date(createdAt).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Hozirgina";
  if (minutes < 60) return `${minutes} daqiqa oldin`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} soat oldin`;
  return `${Math.floor(hours / 24)} kun oldin`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "blue";
    case "info":
      return "cyan";
    case "warning":
      return "orange";
    case "error":
      return "red";
    default:
      return "default";
  }
};

export enum NotificationStatus {
  NEW = "new",
  READ = "read",
  CLEAR = "clear",
}

interface NotificationItemProps {
  notif: NotificationData;
  onMarkAsRead: (id: number) => void;
  handleNavigate: (link: string) => void;
}

const NotificationItem = ({
  notif,
  onMarkAsRead,
  handleNavigate,
}: NotificationItemProps) => (
  <List.Item
    key={notif.id}
    className="notification_item_custom py-3! px-4! rounded-lg! mb-2! border! border-solid! border-[#f0f0f0]! hover:border-[#667eea]! "
    // onClick={() => notif.link && handleNavigate(notif?.link)}
    actions={[
      <Tooltip title="O'qildi deb belgilash" key={`action-${notif.id}`}>
        <Button
          type="text"
          icon={<CheckOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead(notif.id);
          }}
          className="hover_action_btn"
        />
      </Tooltip>,
    ]}
    style={{
      cursor: notif.link ? "pointer" : "default",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
  >
    <List.Item.Meta
      title={
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#5B6871] text-sm">
              {notif.title}
            </span>
            {notif.link && (
              <FiExternalLink
                size={14}
                onDoubleClick={() => handleNavigate(notif?.link)}
                className="text-[#8b949e] hover:text-[#667eea] transition-colors"
              />
            )}
          </div>
          <Tag
            color={getStatusColor(notif.status)}
            className="text-[12px]! font-medium!"
          >
            {notif.status === NotificationStatus?.NEW ? "Yangi" : ""}
          </Tag>
        </div>
      }
      description={
        <Space direction="vertical" size={4} className="w-full">
          <div className="text-[13px] text-[#57606a] leading-1.5 ">
            {notif.description}
          </div>
          <div className="text-[12px] text-[#8b949e] font-medium">
            {formatTimeAgo(notif.createdAt)}
          </div>
        </Space>
      }
    />
  </List.Item>
);

const HeaderNotification = () => {
  const navigate = useNavigate();
  const userData = useStoreUsers(selectedUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const getData = useCallback(() => {
    setIsLoading(true);
    getNotificationMe({ page: 1, limit: 1000 })
      .then((res) => {
        if (res?.data) {
          setNotifications(res?.data);
          setCount(res?.count);
        }
      })
      .catch((err) => console.error(err?.message))
      .finally(() => setIsLoading(false));
  }, [userData?.id]);

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, 600000);
    return () => clearInterval(intervalId);
  }, [getData]);

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  const markAsRead = (id: number) => {
    patchNotification({
      notificationId: id,
      recipientId: userData?.id,
      status: NotificationStatus?.READ,
    }).then(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      // setCount((prev) => prev - 1)
      getData();
    });
  };

  const markAllAsRead = () => {
    patchNotification({
      notificationId: 0,
      recipientId: userData?.id,
      status: NotificationStatus?.CLEAR,
    }).then(() => {
      setNotifications([]);
      setCount(0);
    });
  };

  const renderNotifications = (
    <div
      style={{ width: notifications?.length > 0 ? 420 : 280, maxWidth: "90vw" }}
    >
      {notifications?.length > 0 ? (
        <div className="rounded-lg overflow-hidden">
          <div
            className="p-4 text-white"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="m-0 text-[16px] font-semibold flex items-center gap-2">
                <BellFilled /> Bildirishnomalar
              </h3>
              <span className="bg-[#FFFFFF33] rounded-xl py-1 px-3 text[12px] font-semibold">
                {count}
              </span>
            </div>
          </div>

          <div
            className="max-h-100 overflow-y-auto p-2 bg-[#ffffff]"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            {isLoading ? (
              <div className="flex justify-center p-5">
                <Spin />
              </div>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(notif) => (
                  <NotificationItem
                    key={notif.id}
                    notif={notif}
                    onMarkAsRead={markAsRead}
                    handleNavigate={handleNavigate}
                  />
                )}
              />
            )}
          </div>

          <Divider style={{ margin: "8px 0" }} />

          <div className="py-2 px-3 text-center">
            <Button
              type="primary"
              block
              onClick={markAllAsRead}
              icon={<CheckOutlined />}
              className="bg-[#4094f7]! hover:bg-[#1677ff]! border-none! h-9! font-semibold! "
            >
              Hammasi o'qildi
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-10 px-5 text-center bg-[#ffffff] rounded-lg">
          <Empty
            description="Bildirishnoma yo'q"
            className="m-0!"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
          <p className="text-[#8b949e] text-[13px] mt-3">
            Yangi bildirishnomalar paydo bo'lganda bu yerda ko'rinadi
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex items-center pr-2 justify-end border-l border-solid border-[#d9d9d9] pl-3 ">
      <Popover
        content={renderNotifications}
        trigger="click"
        placement="bottomRight"
        open={open}
        onOpenChange={setOpen}
        overlayStyle={{
          borderRadius: "8px",
          boxShadow:
            "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Tooltip title="Bildirishnomalar" placement="top">
          <Badge
            count={count || 0}
            offset={[-4, 4]}
            showZero={false}
            overflowCount={99}
            style={{
              backgroundColor: "#ff4d4f",
              boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px rgba(255, 77, 79, 0.2)",
            }}
          >
            <Button
              type="text"
              shape="circle"
              icon={
                notifications.length > 0 ? (
                  <MdOutlineNotificationsActive
                    size={23}
                    style={{
                      color: "rgb(91, 104, 113)",
                      verticalAlign: "middle",
                    }}
                  />
                ) : (
                  <MdOutlineNotificationsNone size={23} />
                )
              }
              style={{
                fontSize: "18px",
                color: notifications.length > 0 ? "#667eea" : "#595959",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              className="notification_btn  "
            />
          </Badge>
        </Tooltip>
      </Popover>

      <style>{`
        .notification_btn:hover {
          color: #667eea !important;
          transform: scale(1.1);
        }

        .notification_btn:active {
          transform: scale(0.95);
        }

        .notification_item_custom:hover {
          background-color: #f6f8fa !important;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
        }

        .hover_action_btn {
          color: #8b949e !important;
          transition: all 0.2s;
        }

        .hover_action_btn:hover {
          color: #667eea !important;
        }

        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: transparent;
        }

        div::-webkit-scrollbar-thumb {
          background: #d0d7de;
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #8b949e;
        }
      `}</style>
    </div>
  );
};

export default HeaderNotification;
