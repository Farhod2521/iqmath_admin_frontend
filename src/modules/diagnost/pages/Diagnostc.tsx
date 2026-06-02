import { getDiagnost, getDiagnosts, getTeacherFine } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Card, Table } from "antd";
import React, { useState } from "react";

const Diagnostc = () => {
  const [filterData, setFilterData] = useState({
    student_id: undefined,
    subject_id: undefined,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["data-diagnostc"],
    queryFn: () => getDiagnosts(filterData),
  });

  //   const { data, isLoading, error } = useQuery({
  //     queryKey: ["data-diagnostc"],
  //     queryFn: () => getTeacherFine(),
  //   });

  return (
    <Card title="Diagnostikalar">
      <Table />
    </Card>
  );
};

export default Diagnostc;
