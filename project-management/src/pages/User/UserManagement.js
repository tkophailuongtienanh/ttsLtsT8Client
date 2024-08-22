import { replace } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Pagination, Select, Space, Table } from "antd";
import fetchWithAuth, { fetchApi, getWithAuth } from "../../utils/callApi";
import { useToast } from "../../context/ToastContext";

const PAGESIZE = 25;
const roleOption = [
  { value: 1, code: "Leader", label: "Leader" },
  { value: 2, code: "Designer", label: "Designer" },
  { value: 3, code: "Deliver", label: "Deliver" },
  { value: 4, code: "Manager", label: "Manager" },
  { value: 5, code: "Employee", label: "Employee" },
  { value: 6, code: "Admin", label: "Admin" },
];
const UserManagement = () => {
  const addToast = useToast();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // render: (_, record) => <p>{record.age}</p>,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Quyền hạn",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <>
            <Select
              mode="multiple"
              maxTagCount="responsive"
              value={record.permissionCodes}
              onChange={(value) => updateUserRole(record.id, value)}
              //   className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
              className="w-60 mt-1 "
              style={{ minWidth: "280px" }}
              //   labelInValue
              filterOption={false}
              showSearch
              options={roleOption}
            />
          </>
        </Space>
      ),
    },
  ];
  const updateUserRole = async (userId, value) => {
    try {
      const response = await fetchWithAuth("Users/UpdateUserPermission", {
        body: { UserId: userId, Permission: value },
      });
      const data = response.data;
      if (response.code == "200") {
        const updatedUsers = users.map((u) =>
          u.id == userId ? { ...u, permissionCodes: value } : u
        );
        setUsers(updatedUsers);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const searchUser = async (
    pageIndex = currentPage - 1,
    pageSize = PAGESIZE,
    searchStr = search
  ) => {
    try {
      const response = await getWithAuth(
        "Users/GetAll?" +
          "search=" +
          searchStr +
          "&pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      );
      const data = response.data;

      if (response.code == "200") {
        const teamMembersWithKey = data.list.map((member) => ({
          ...member,
          key: member.id, // Hoặc sử dụng một thuộc tính duy nhất khác
          permissionCodes: member.permissions.map((perm) => perm.roleId),
        }));
        setTotal(data.total);
        setUsers(teamMembersWithKey);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const btnSearchClick = () => {
    setCurrentPage(1);
    searchUser(currentPage - 1, PAGESIZE, search);
  };
  const onChange = (curpage, pageSize) => {
    setCurrentPage(curpage);
    searchUser(curpage - 1, pageSize);
  };
  useEffect(() => {
    searchUser();
  }, []);
  return (
    <>
      <Card className="mt-5 shadow-md border-0">
        <Input
          className="mb-3 p-2 w-1/2 mr-3"
          type="text"
          placeholder="Tên, email người dùng"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></Input>
        <Button
          onClick={btnSearchClick}
          type="primary"
          size="large"
          className="h-full"
        >
          <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
        </Button>
        <Table columns={columns} dataSource={users} pagination={false} />
        <Pagination
          className="mt-2"
          align="end"
          current={currentPage}
          onChange={onChange}
          total={total}
          pageSize={PAGESIZE}
        />
      </Card>
      ;
    </>
  );
};
export default UserManagement;
