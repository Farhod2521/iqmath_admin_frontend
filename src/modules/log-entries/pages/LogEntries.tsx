import { getLogEntrieses } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Card, Table } from "antd";
import React from "react";

const LogEntries = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data-log-entries"],
    queryFn: getLogEntrieses,
  });

  console.log("datam", data);

  return (
    <Card title="Barcha loglar">
      <Table />
    </Card>
  );
};

export default LogEntries;
