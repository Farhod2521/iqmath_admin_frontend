import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  Button,
  Tag,
  TabsProps,
  Tabs,
  TablePaginationConfig,
  message,
  Form,
} from "antd";
import {
  getSingleUser,
  getUserMe,
  getUsers,
  putUser,
  UserData,
  UsersFormData,
} from "@/services";
import { UserStatus } from "../../../shared/utils/constants";
import TableComponent from "@/shared/components/tables/TableComponent";
import { BiDownload } from "react-icons/bi";
import FilterPermises from "../components/user-permises/FilterPermises";
import {
  selectedFetchUserData,
  selectedSetAuth,
  selectedUserData,
  useStoreAuth,
  useStoreUsers,
} from "@/store";
import { UserPermisesColumns } from "../components/user-permises/UserPermisesColumns";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "@/shared/utils/handleApiError";

interface FilterData {
  search: string | undefined;
  roleId: number | undefined;
  organisationId: number | undefined;
  regionSoato: number | undefined;
  districtSoato: number | undefined;
}

const UsersPermises = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userDataMe = useStoreUsers(selectedUserData);
  const userRole = userDataMe?.role?.code;
  const [data, setData] = useState<UserData[]>([]);
  const [status, setStatus] = useState<UserStatus>(UserStatus.ACTIVE_STAFF);
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
    total: number;
  }>({
    current: 1,
    pageSize: 10,
    total: 10,
  });
  const [filterData, setFilterData] = useState<FilterData>({
    search: undefined,
    roleId: undefined,
    organisationId: undefined,
    regionSoato: undefined,
    districtSoato: undefined,
  });
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState<number | undefined>();
  const setAuth = useStoreAuth(selectedSetAuth);
  const fetchUserData = useStoreUsers(selectedFetchUserData);

  const [selectedRole, setSelectedRole] = useState<{
    chooseDistrict: boolean;
    chooseRegion: boolean;
  }>({
    chooseDistrict: false,
    chooseRegion: false,
  });

  const showModal = () => setOpenModal(true);
  const hideModal = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    getUsers({
      limit: pagination.pageSize,
      page: pagination.current,
      status: status,
      ...filterData,
    })
      .then((res) => {
        setData(res?.data);
        setPagination((prev) => ({
          ...prev,
          total: res.count,
          current: res.count > 0 && res?.data?.length === 0 ? 1 : prev.current,
        }));
      })
      .finally(() => setLoading(false));
  }, [filterData, pagination?.pageSize, pagination?.current, status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCopy = (login: string) => {
    navigator.clipboard.writeText(login);
    message.success(`Nusxa olindi: ${login}`);
  };

  const items: TabsProps["items"] = [
    {
      key: UserStatus.ACTIVE_STAFF,
      label: "Tashkilot foydalanuvchilari",
    },
    {
      key: UserStatus.INACTIVE_STAFF,
      label: "Faol bo'lmagan tashkilot foydalanuvchilari",
    },
    {
      key: UserStatus.CITIZEN,
      label: "Kirishga uringanlar",
    },
  ];

  const handleTableChange = (p: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, ...p }));
    if (p?.pageSize !== pagination?.pageSize) {
      setData([]);
    }
  };

  const handleFilterChange = useCallback((updates: Partial<FilterData>) => {
    setFilterData((prev) => ({ ...prev, ...updates }));
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, []);

  const handleStatusChange = useCallback((key: string) => {
    setStatus(key as UserStatus);
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, []);

  const handleExcelDownload = useCallback(() => {
    // Excel yuklab olish logikasi
    message.info("Excel yuklab olish funksiyasi amalga oshirilmoqda...");
  }, []);

  const handleRowClick = (record: UserData) => {
    setUserId(record?.id);
    getSingleUser(record?.id)
      .then((res) => {
        form.setFieldsValue({
          status: res?.status,
          regionSoato: res?.position?.regionSoato,
          districtSoato: res?.position?.districtSoato,
          organisationId: res?.position?.organisation?.id,
          roleId: res?.position?.role?.id,
        });
        setSelectedRole({
          chooseDistrict: res?.position?.role?.chooseDistrict,
          chooseRegion: res?.position?.role?.chooseRegion,
        });
        showModal();
      })
      .catch((err) => handleApiError(err));
  };

  const handleAuthImpersonate = (record: UserData) => {
    // getAuthImpersonate({ userId: record.id })
    //   .then((res) => {
    //     const authUser = getAuthData()
    //     // const data = { ...authUser, accessToken: res.accessToken }
    //     const data = { ...authUser, ...res, rever_access_token: authUser.accessToken }
    //     setAuth(data)
    //     saveAuthData(data)
    //     fetchUserData()
    //     toast.success('Muvaffaqiyatli kirildi')
    //     navigate('/dashboard')
    //   })
    //   .catch((err) => handleApiError(err))
  };
  const handleSubmit = (values: UsersFormData) => {
    if (userId) {
      putUser(userId, values)
        .then(() => {
          fetchData();
          toast.success(`Muvaffaqiyatli o'zgartirildi`);
          hideModal();
        })
        .catch((err) => handleApiError(err));
    }
  };

  const handleNavigate = (data: UserData) => {
    navigate(`/users/permises/${data?.id}`);
  };

  const columns = useMemo(
    () =>
      UserPermisesColumns({
        handleCopy,
        userRole,
        pagination,
        handleRowClick,
        handleAuthImpersonate,
      }),
    [handleCopy, userRole, pagination],
  );

  return (
    <Card
      title="Foydalanuvchilar"
      extra={
        <>
          <Button
            type="primary"
            icon={<BiDownload />}
            onClick={handleExcelDownload}
            className="bg-green-600 hover:bg-green-700 border-green-600"
          >
            Excel formatida yuklab olish
          </Button>
        </>
      }
    >
      <FilterPermises
        filterData={filterData}
        onFilterChange={handleFilterChange}
      />
      <Tabs
        className="custom_tabs"
        defaultActiveKey={UserStatus.ACTIVE_STAFF}
        items={items}
        onChange={handleStatusChange}
      />

      <TableComponent
        bordered={true}
        dataSource={data}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        onRow={(record) => ({
          onDoubleClick: () => handleNavigate(record),
        })}
        totalTitle="Topilgan foydalanuvchilar soni"
      />
    </Card>
  );
};

export default UsersPermises;
