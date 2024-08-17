import { Button, Card, Input, Select, Space, Table, Tag } from "antd";
import React, { useMemo, useRef, useState } from "react";
const columns = [
  {
    title: "STT",
    dataIndex: "name",
    key: "name",
    render: (_, record) => <p>{record.age}</p>,
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Phone",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <button className="bg-green-500 p-2 rounded">Đặt làm quản lý</button>
        <button className="bg-red-500 p-2 rounded">Xóa khỏi phòng ban</button>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const TeamDetail = () => {
  return (
    <>
      <div className=" flex justify-between">
        <p className="my-6 text-2xl font-semibold text-gray-200">
          Thông tin phòng ban
        </p>
      </div>
      <Card className=" shadow-md border-0">
        <div className="flex gap-4">
          <div className="basis-1/2">
            <label>Tên phòng ban</label>
            <Input
              type="text"
              className="w-full mt-1"
              placeholder="Phòng công vụ"
            ></Input>
          </div>
          <div className="basis-1/4">
            <label>Ngày tạo</label>
            <Input
              disabled
              type="date"
              className="w-full mt-1"
              placeholder="Phòng công vụ"
            ></Input>
          </div>
          <div className="basis-1/4">
            <label>Ngày cập nhật</label>
            <Input
            disabled
              type="date"
              className="w-full mt-1"
              placeholder="Phòng công vụ"
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 mt-3">
          <div className="basis-full">
            <label>Mô tả</label>
            <Input
              type="text"
              className="w-full mt-1"
              placeholder="Phòng công vụ"
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 mt-3">
          <div className="basis-1/3">
            <label>Họ tên Quản lý</label>
            <Input
              type="Text"
              className="w-full mt-1"
              placeholder="Họ và tên"
              disabled
            ></Input>
          </div>
          <div className="basis-1/3">
            <label>Email Người quản lý</label>
            <Input
              type="Text"
              className="w-full mt-1"
              placeholder="Họ và tên"
              disabled
            ></Input>
          </div>
          <div className="basis-1/3">
            <label>SĐT Người quản lý</label>
            <Input
              type="Text"
              className="w-full mt-1"
              placeholder="Họ và tên"
              disabled
            ></Input>
          </div>
        </div>
      </Card>
      <div className=" flex justify-between">
        <p className="my-6 text-xl font-semibold text-gray-200">
          Danh sách thành viên (12)
        </p>
      </div>
      <Card className=" shadow-md border-0">
        <Input
          className="mb-3 p-2 w-1/2 mr-3"
          type="text"
          placeholder="Tên, email người dùng"
        ></Input>
        <Button type="primary" size="large" className="h-full">
          <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm{" "}
        </Button>
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
};
export default TeamDetail;
