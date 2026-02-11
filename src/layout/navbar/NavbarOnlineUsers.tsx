import { getOnlineUsers, OnlineUsersCountType } from "@/http";
import { Button } from "@mui/material";
import { Card, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialValues = {
  totalCount: "0",
};

const NavbarOnlineUsers = () => {
  const [usersOnlineCount, setUserOnlineCount] =
    useState<OnlineUsersCountType>(initialValues);
  const [loading, setLoading] = useState(false);

  // const getData = () => {
  //   setLoading(true)
  //   getOnlineUsers()
  //     .then((res) => {
  //       setUserOnlineCount(res)
  //     })
  //     .finally(() => setLoading(false))
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className="flex ml-5 items-center">
      <Space className="navbar__onlineusers mt-4">
        <Card>
          <p className=" text-[14px] font-semibold whitespace-nowrap">
            Online foydalanuvchilar soni -{" "}
            <Tag
              color="processing"
              className=" border-none "
              style={{ fontSize: "15px" }}
            >
              {usersOnlineCount.totalCount}
            </Tag>
          </p>
        </Card>
      </Space>
    </div>
  );
};

export default NavbarOnlineUsers;
