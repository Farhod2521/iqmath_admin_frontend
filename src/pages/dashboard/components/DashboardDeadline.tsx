import {
  Button,
  Card,
  Input,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import {
  DeadlinesLateType,
  getDeadlinesLate,
  getDeadlinesLateDownloadExcel,
  OrganisationType,
} from "@/http";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserMe } from "@/store/auth/authSlice";
import FAutoSelectWithPositions from "@/components/form/select/FAutoSelectWithPositions";
import { BsFiletypeXlsx } from "react-icons/bs";
import FAutoSelect from "@/components/form/select/FAutoSelect";
import { url_organisations, url_statuses } from "@/constants/urls";
import { formatDate } from "@/utils/formatDate";
import { formatDeadlineStatus } from "../utils/formatDeadlineStatus";
import { downloadBase64 } from "@/utils/file";
import { getStatusColor } from "../utils/formatDeadlineStatusColor";
import InputMaskKadastr from "@/components/mask/input-mask/InputMaskKadastr";

function DashboardDeadline() {
  const userData = useAppSelector(selectUserMe);

  const [data, setData] = useState<DeadlinesLateType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });
  const [filterData, setFilterData] = useState({
    search: undefined,
    regionSoato: userData?.position?.region?.soato || undefined,
    districtSoato: userData?.position?.district?.soato || undefined,
    neighborhoodId: undefined,
    organisationId: undefined,
  });

  const fetchProperties = () => {
    setLoading(true);
    getDeadlinesLate({
      limit: pagination.pageSize,
      page: pagination.current,
      ...filterData,
    })
      .then((res) => {
        setData(res.lateDeadlinesList);
        setPagination((prev) => ({
          ...prev,
          total: res.totalCount,
          current:
            res.totalCount > 0 && res.lateDeadlinesList.length === 0
              ? 1
              : prev.current,
        }));
      })
      .finally(() => setLoading(false));
  };

  const handleTableChange = (p: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, ...p }));
    if (pagination.pageSize !== pagination?.pageSize) {
      setData([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [pagination.current, pagination.pageSize, JSON.stringify(filterData)]);

  const columns = [
    {
      title: "T/r",
      dataIndex: "id",
      width: "15px",
      render: (rol: string, d: any, idx: number) => {
        const { current, pageSize } = pagination;
        return (
          <div className="flex items-center justify-center">
            {(current - 1) * pageSize + idx + 1}
          </div>
        );
      },
    },
    {
      title: "Kadastr raqami",
      dataIndex: "cadastralNumber",
      render: (n: string, i: DeadlinesLateType) => {
        return <span className="text-blue-400 hover:underline">{n}</span>;
      },
    },
    { title: "Viloyat", dataIndex: "regionName" },
    { title: "Tuman", dataIndex: "districtName" },
    { title: "Mahalla", dataIndex: "neighborhoodName" },
    {
      title: "Tizimdagi holati",
      dataIndex: "currentStatusName",
    },
    {
      title: "Muddat buzilgan holati",
      dataIndex: "deadlineStatusName",
      width: "10%",
      render: (dedStatus: string, i: DeadlinesLateType) => {
        const statusCode = i?.deadlineStatusCode;
        return <Tag color={getStatusColor(statusCode)}>{dedStatus}</Tag>;
      },
    },
    {
      title: "Tashkilot",
      dataIndex: "organisationName",
    },
    {
      title: "Tashkilotga kelib tushgan sana",
      dataIndex: "createdAt",
      width: "10%",
      render: (time: string) => {
        const { minutes, hours, day, month, year } = formatDate(time);
        return (
          <div style={{ width: "140px" }}>
            {`${day}.${month}.${year}`}{" "}
            <Tag color="cyan">{`${hours}:${minutes}`}</Tag>
          </div>
        );
      },
    },
    {
      title: "Muddatdan o'tgan kun",
      dataIndex: "deadline",
      width: "8%",
      render: (deadline: string, i: DeadlinesLateType) => {
        if (!deadline) return "-";
        const remainingTime = formatDeadlineStatus(
          i.actionTime,
          deadline,
          i.status,
        );
        return <Tag color="red">{remainingTime}</Tag>;
      },
    },
  ];

  const downloadExcel = async () => {
    setLoadingDownload(true);

    try {
      const res: any = await getDeadlinesLateDownloadExcel({ ...filterData });
      // const url = await getFileUrl(res?.filePath);
      // downloadBase64(url, "FILE");
    } finally {
      setLoadingDownload(false);
    }
  };
  const handleSearchChange = (value: any) => {
    setFilterData((prev) => ({ ...prev, search: value }));
  };

  return (
    <Card
      title="Tashkilotlar kesimida muddati o'tgan holatlar bo'yicha nomma-nom jadvali"
      className="dashboard__application"
      extra={
        <>
          <Button
            className="btn-success"
            type="primary"
            icon={<BsFiletypeXlsx />}
            onClick={downloadExcel}
            loading={loadingDownload}
          >
            Yuklash
          </Button>
        </>
      }
    >
      <Space>
        <div className="flex flex-wrap w-full gap-4 mb-4 ">
          {/* <Input
            name="search"
            allowClear
            placeholder="Qidirish kadastr raqami"
            style={{ width: 200 }}
            onChange={(e: any) => setFilterData((prev) => ({ ...prev, search: e.target.value }))}
            /> */}
          <InputMaskKadastr
            value={filterData.search}
            onChange={handleSearchChange}
            className="sm:w-[200px] w-full"
            placeholder="Qidirish kadastr raqami"
          />
          <FAutoSelectWithPositions
            filterData={filterData}
            setFilterData={setFilterData}
          />
          <FAutoSelect
            placeholder="Tashkilot"
            style={{ width: 180 }}
            formatOptions={(e) =>
              e.organisationsList
                .filter(
                  (i: OrganisationType) =>
                    !withoutOrganisation.includes(Number(i.id)),
                )
                .map((i: OrganisationType) => ({
                  value: i.id,
                  label: i.shortName,
                }))
            }
            url={url_organisations}
            value={filterData.organisationId}
            onChange={(e: any) =>
              setFilterData((prev) => ({ ...prev, organisationId: e }))
            }
          />
          {/* <FAutoSelect
            placeholder="Holati"
            style={{ width: 180 }}
            formatOptions={(e) => e.statusesList.map((i: StatusType) => ({ value: i.id, label: i.name }))}
            url={url_statuses}
            value={filterData.statusId}
            onChange={(e: any) => setFilterData((prev) => ({ ...prev, statusId: e }))}
          /> */}
        </div>
      </Space>
      <Table
        size="small"
        bordered={true}
        columns={columns}
        dataSource={data}
        rowKey={(record: any) => record?.propertyId}
        loading={loading}
        className="table__wrapper"
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 20, 30, 50, 70, 100],
          showSizeChanger: true,
          locale: { items_per_page: "" },
          showTotal: (total, rage) => (
            <div>
              Jami: <b>{total}</b> ta <b>{rage[0]}</b> dan <b>{rage[1]}</b>{" "}
              gacha
            </div>
          ),
        }}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />
    </Card>
  );
}

export default DashboardDeadline;

const withoutOrganisation = [28, 30, 2, 1, 29];
