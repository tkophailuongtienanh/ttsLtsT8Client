import { replace } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";
import fetchWithAuth, { fetchApi, getWithAuth } from "../../utils/callApi";
import { useToast } from "../../context/ToastContext";
import PageTitle from "../../components/Typography/PageTitle";
import { Label } from "@windmill/react-ui";

const PAGESIZE = 25;
const roleOption = [
  { value: 1, code: "Leader", label: "Leader" },
  { value: 2, code: "Designer", label: "Designer" },
  { value: 3, code: "Deliver", label: "Deliver" },
  { value: 4, code: "Manager", label: "Manager" },
  { value: 5, code: "Employee", label: "Employee" },
  { value: 6, code: "Admin", label: "Admin" },
];
const CustomerManagement = () => {
  const { addToast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [customerId, setCustomerId] = useState("");
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
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-end">
          <Button
            onClick={() =>
              UpdateCustomerBtnClick(
                record.id,
                record.fullName,
                record.phoneNumber,
                record.address
              )
            }
            type="primary"
            shape="circle"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        </div>
      ),
    },
  ];
  const searchData = async (
    pageIndex = currentPage - 1,
    pageSize = PAGESIZE,
    searchStr = search
  ) => {
    try {
      const response = await getWithAuth(
        "Customer/GetAll?" +
          "search=" +
          searchStr +
          "&pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      );
      const data = response.data;
      console.log(data);

      if (response.code == "200") {
        const listWithKey = data.list.map((member) => ({
          ...member,
          key: member.id, // Hoặc sử dụng một thuộc tính duy nhất khác
        }));
        setTotal(data.total);
        setUsers(listWithKey);
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
    searchData(currentPage - 1, PAGESIZE, search);
  };
  const onChange = (curpage, pageSize) => {
    setCurrentPage(curpage);
    searchData(curpage - 1, pageSize);
  };
  useEffect(() => {
    searchData();
  }, []);
  const onModalOkClick = async () => {
    if (modalAction === "ADD") {
      await fetchAddCustomer();
    } else if (modalAction === "UPD") {
      await fetchUpdateCustomer();
    }
  };
  const fetchAddCustomer = async () => {
    try {
      const response = await fetchWithAuth("Customer/AddCustomer", {
        body: { fullName: name, PhoneNumber: phone, Address: address },
      });
      const data = response.data;
      if (response.code == "200") {
        searchData();
        addToast("success", "Thêm thành công", 5000);
        setIsModalOpen(false);
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
  const fetchUpdateCustomer = async () => {
    const response = await fetchWithAuth("Customer/UpdateCustomer", {
      body: {
        Id: customerId,
        fullName: name,
        PhoneNumber: phone,
        Address: address,
      },
    });
    const data = response.data;
    if (response.code == "200") {
      searchData();
      addToast("success", "Cập nhật thành công", 5000);
      setIsModalOpen(false);
    } else if (response.code) {
      addToast(
        "danger",
        response.code + ": " + data.errorCode + "-" + data.message,
        10000
      );
    }
  };
  const AddCustomerBtnClick = () => {
    setModalAction("ADD");
    setName("");
    setAddress("");
    setPhone("");
    setIsModalOpen(true);
  };
  const UpdateCustomerBtnClick = (id, name = "", phone = "", address = "") => {
    setModalAction("UPD");
    setCustomerId(id);
    setName(name);
    setAddress(address);
    setPhone(phone);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className=" flex justify-between">
        <PageTitle>Danh sách khách hàng</PageTitle>
        <button
          onClick={AddCustomerBtnClick}
          className="bg-purple-700 h-12 self-center rounded-lg px-4 text-white"
        >
          <i className="fa-solid fa-plus mr-2"></i>Thêm mới
        </button>
      </div>
      <Card className="shadow-md border-0">
        <Input
          className="mb-3 p-2 w-1/2 mr-3"
          type="text"
          placeholder="Tên khách hàng"
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
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={onModalOkClick}
        onCancel={closeModal}
      >
        <Label>
          <span>Tên khách hàng</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
            type="username"
            placeholder="Nguyễn Văn A"
          />
        </Label>
        <Label className="mt-4">
          <span>Số điện thoại</span>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1"
            type="email"
            placeholder="0987653321"
          />
        </Label>
        <Label className="mt-4">
          <span>Địa chỉ</span>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1"
            type="email"
            placeholder="Hà Nội"
          />
        </Label>
      </Modal>
    </>
  );
};
export default CustomerManagement;
