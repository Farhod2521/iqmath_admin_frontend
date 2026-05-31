import { getWithDrawalSettings } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Card, Table } from "antd";
import React from "react";

const WithDrawal = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data-with-drawal"],
    queryFn: getWithDrawalSettings,
  });

  return (
    <Card title="Barcha sozlamalar">
      <Table />
    </Card>
  );
};

export default WithDrawal;
