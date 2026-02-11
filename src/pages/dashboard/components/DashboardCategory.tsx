import { useAppSelector } from "@/hooks/useRedux";
import {
  StatisticsLawAccordanceType,
  getExcelLawAccordance,
  getDashboardLawAccordance,
  byRole,
  DashboardLawAccordanceParamsType,
} from "@/http";
import { Button, Card, Table, message } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BsFiletypeXlsx } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import type { TableColumnsType } from "antd";
import { selectUserMe } from "@/store/auth/authSlice";
import { downloadBase64 } from "@/utils/file";
import FAutoSelect from "@/components/form/select/FAutoSelect";
import { url_statuses } from "@/constants/urls";

// ---- Helpers ----
const lawCountByName = (
  list: { lawAccordance: string; propertyCount: number }[] = [],
  lawName: string,
) => list.find((i) => i.lawAccordance === lawName)?.propertyCount ?? 0;

export default function DashboardCategory() {
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserMe);

  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [data, setData] = useState<StatisticsLawAccordanceType[]>([]);
  const [columns, setColumns] = useState<
    TableColumnsType<StatisticsLawAccordanceType>
  >([]);
  const [footerTotals, setFooterTotals] = useState<
    { name: string; count: number }[]
  >([]);

  const userRole = {
    chooseDistrict: false,
    chooseRegion: false,
    ...userData?.position.role,
  };

  const filterByValue =
    userRole.chooseRegion && userRole.chooseDistrict
      ? byRole.Neighborhood
      : userRole.chooseRegion
      ? byRole.District
      : byRole.Region;
  const filterBySoato =
    userRole.chooseRegion && userRole.chooseDistrict
      ? userData?.position.district.soato
      : userRole.chooseRegion
      ? userData?.position.region.soato
      : 0;

  const [filterData, setFilterData] =
    useState<DashboardLawAccordanceParamsType>({
      by: filterByValue,
      soato: Number(filterBySoato),
      statusId: undefined,
    });
  // Local breadcrumb/scoping (Redux's categorySlice o‘rniga)
  const [scope, setScope] = useState<{
    by: "region" | "district" | "neighborhood";
    region?: { soato: string; name: string };
    district?: { soato: string; name: string };
  }>({ by: "region" });

  const userRol = useMemo(() => {
    const pos = userData?.position;
    return {
      isRepublic: !pos?.district && !pos?.region,
      isRegion: !pos?.district && !!pos?.region,
      isDistrict: !!pos?.district && !!pos?.region,
    };
  }, [userData]);

  const buildColumns = useCallback(
    (
      scopeTitle: string,
      laws: string[],
    ): TableColumnsType<StatisticsLawAccordanceType> => [
      { title: scopeTitle, key: "name", dataIndex: "name", width: 220 },
      ...laws.map((law) => ({
        title: law,
        key: law,
        dataIndex: "lawAccordancesStatisticsList",
        render: (list: any) => lawCountByName(list, law),
      })),
      {
        title: "Jami",
        key: "propertyTotalCount",
        dataIndex: "propertyTotalCount",
        width: 120,
      },
    ],
    [],
  );

  const buildFooter = useCallback(
    (laws: string[], stats: StatisticsLawAccordanceType[]) => {
      const totals = laws.map((law) => {
        const sum = stats.reduce(
          (a, b) => a + lawCountByName(b.lawAccordancesStatisticsList, law),
          0,
        );
        return { name: law, count: sum };
      });
      const jami = stats.reduce((a, b) => a + (b.propertyTotalCount || 0), 0);
      setFooterTotals([...totals, { name: "Jami", count: jami }]);
    },
    [],
  );

  const fetchScopedData = useCallback(
    async (args: {
      soato: string | number;
      by: "region" | "district" | "neighborhood";
      label: string;
    }) => {
      try {
        setLoading(true);
        const { soato, by, label } = args;
        const res = await getDashboardLawAccordance({
          ...filterData,
          soato,
          by,
        });
        setColumns(buildColumns(label, res.lawAccordancesList));
        setData(res.statisticsCountsList);
        buildFooter(res.lawAccordancesList, res.statisticsCountsList);
      } catch (e: any) {
        message.error(
          e?.message || "Maʼlumotlarni yuklashda xatolik yuz berdi",
        );
      } finally {
        setLoading(false);
      }
    },
    [buildColumns, buildFooter, filterData],
  );

  // STATUS o‘zgarsa — aynan hozirgi scope’da qayta yuklash (scope’ni o‘zgartirmasdan)
  useEffect(() => {
    if (!filterData) return;

    const by = filterByValue;
    const soato =
      by === "region"
        ? filterBySoato
        : by === "district"
        ? scope.region?.soato
        : scope.district?.soato;
    if (soato == null) return;

    const label =
      by === "region" ? "Viloyat" : by === "district" ? "Tuman" : "Mahalla";
    fetchScopedData({ soato, by, label });
  }, [filterData?.statusId]);

  // entry points (local scope boshqaruvi)
  const getDataR = useCallback(() => {
    setScope({ by: "region" });
    fetchScopedData({ soato: 0, by: "region", label: "Viloyat" });
  }, [fetchScopedData]);

  const getDataD = useCallback(
    (soato: string, name: string) => {
      setScope((s) => ({
        ...s,
        by: "district",
        region: { soato, name },
        district: undefined,
      }));
      fetchScopedData({ soato, by: "district", label: "Tuman" });
    },
    [fetchScopedData],
  );

  const getDataN = useCallback(
    (soato: string, name: string) => {
      setScope((s) => ({
        ...s,
        by: "neighborhood",
        district: { soato, name },
      }));
      fetchScopedData({ soato, by: "neighborhood", label: "Mahalla" });
    },
    [fetchScopedData],
  );
  // useEffect(() => {
  //   if (!userData?.position) return
  //   console.log('11')

  //   const filterBySoato =
  //     userRole.chooseRegion && userRole.chooseDistrict
  //       ? userData?.position.district.soato
  //       : userRole.chooseRegion
  //       ? userData?.position.region.soato
  //       : 0

  //   setFilterData({
  //     by: byRole.Region,
  //     soato: Number(filterBySoato),
  //     statusId: undefined
  //   })
  // }, [userData])

  // INITIAL LOAD faqat bir marta
  const didInit = useRef(false);
  useEffect(() => {
    if (!userData?.position) return;
    if (didInit.current) return;
    didInit.current = true;
    console.log("22");

    if (userRol.isRepublic) {
      getDataR();
      return;
    }
    if (userRol.isRegion && userData?.position?.region?.soato) {
      const r = userData.position.region;
      getDataD(r.soato, r.name);
      return;
    }
    if (userRol.isDistrict && userData?.position?.district?.soato) {
      const d = userData.position.district;
      getDataN(d.soato, d.name);
      return;
    }
  }, [userData]);

  const handleRowDblClick = useCallback(
    (rec: StatisticsLawAccordanceType) => {
      const len = String(rec.soato || "").length;
      if (len === 4) return getDataD(String(rec.soato), rec.name);
      if (len === 7) return getDataN(String(rec.soato), rec.name);
      // leaf level → open applications (optional)
      // navigate('/applications/aplications_all')
    },
    [getDataD, getDataN, navigate],
  );

  const resolveSoatoBy = (by: "region" | "district" | "neighborhood") =>
    by === "region"
      ? 0
      : by === "district"
      ? scope.region?.soato ?? 0
      : scope.district?.soato ?? 0;

  const downloadExcel = async () => {
    try {
      setLoadingDownload(true);
      const by = scope.by;
      const soato = resolveSoatoBy(by);
      const res = await getExcelLawAccordance({
        soato,
        by,
        statusId: filterData.statusId,
      });
      downloadBase64(res.data.file_content, res.data.file_name);
    } catch (e: any) {
      message.error(e?.message || "Excel yuklashda xatolik");
    } finally {
      setLoadingDownload(false);
    }
  };

  return (
    <Card
      title="Moddalar kesimida"
      extra={
        <div className="flex flex-wrap items-center gap-4">
          <FAutoSelect
            placeholder="Holati"
            style={{ width: 200 }}
            formatOptions={(e) =>
              e.statusesList.map((i: any) => ({
                value: i.id,
                label: i.name,
              }))
            }
            url={url_statuses}
            value={filterData.statusId}
            onChange={(val: any) =>
              setFilterData((prev) => ({ ...prev, statusId: val }))
            }
            allowClear
          />
          {!(userRol.isRegion || userRol.isDistrict) && (
            <Button
              disabled={userRol.isRegion || userRol.isDistrict}
              onClick={getDataR}
              type={scope.by === "region" ? "primary" : "default"}
            >
              Viloyatlar
            </Button>
          )}

          {!userRol.isDistrict && (
            <Button
              disabled={userRol.isDistrict || !scope.region?.soato}
              onClick={() =>
                scope.region?.soato &&
                getDataD(scope.region.soato, scope.region.name)
              }
              type={scope.by === "district" ? "primary" : "default"}
            >
              Tumanlar
            </Button>
          )}
          <Button
            disabled={!scope.district?.soato}
            onClick={() =>
              scope.district?.soato &&
              getDataN(scope.district.soato, scope.district.name)
            }
            type={scope.by === "neighborhood" ? "primary" : "default"}
          >
            Mahallalar
          </Button>
          <Button
            className="ml-2 text-white bg-green-500"
            icon={<BsFiletypeXlsx />}
            onClick={downloadExcel}
            loading={loadingDownload}
          >
            Yuklash
          </Button>
        </div>
      }
    >
      <Table<StatisticsLawAccordanceType>
        bordered
        size="small"
        className="table__wrapper dashboard__application"
        loading={loading}
        columns={[
          {
            title: "T/r",
            key: "index",
            width: 70,
            render: (_: any, __: StatisticsLawAccordanceType, idx: number) =>
              idx + 1,
          },
          ...columns,
        ]}
        dataSource={data}
        rowKey={(r) => String(r.soato ?? r.id ?? r.name)}
        onRow={(record) => ({ onDoubleClick: () => handleRowDblClick(record) })}
        pagination={false}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>
                <b>Jami</b>
              </Table.Summary.Cell>
              {footerTotals.map((item, index) => (
                <Table.Summary.Cell key={item.name} index={index + 2}>
                  <b>{item.count}</b>
                </Table.Summary.Cell>
              ))}
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </Card>
  );
}
