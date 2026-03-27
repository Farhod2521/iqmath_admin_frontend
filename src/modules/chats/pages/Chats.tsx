import { Card, Table } from "antd";
import React from "react";

const Chats = () => {
  return (
    <Card title="Xabarlar">
      <Table pagination={false} bordered />
    </Card>
  );
};

export default Chats;
