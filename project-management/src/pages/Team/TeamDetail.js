import {
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { Label } from "@windmill/react-ui";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import fetchWithAuth, { getWithAuth } from "../../utils/callApi";
import { useToast } from "../../context/ToastContext";

const TeamDetail = () => {
  const { id } = useParams();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [dataChange, setDataChange] = useState(false);
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [manager, setManager] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [member, setMember] = useState(null);
  const [options, setOptions] = useState([]);
  let timeoutId;

  useEffect(() => {
    if (name != team.name || description != team.description)
      setDataChange(true);
    else setDataChange(false);
  });

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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.id != manager.id ? (
            <>
              <button
                className="bg-green-500 p-2 rounded"
                onClick={() => {
                  setAsManager(record.id);
                }}
              >
                Đặt làm quản lý
              </button>
              <button
                className="bg-red-500 p-2 rounded"
                onClick={() => {
                  RemoveFromTeam(record.id);
                }}
              >
                Xóa khỏi phòng ban
              </button>
            </>
          ) : null}
        </Space>
      ),
    },
  ];
  const setAsManager = async (uid) => {
    try {
      const response = await fetchWithAuth("Team/SetManager", {
        body: { managerId: uid, teamId: id },
        method: "POST",
      });
      const data = response.data;
      if (response.code == "200") {
        console.log(data);
        addToast("success", "Thành công", 5000);
        loadData();
        searchTeams(search);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const RemoveFromTeam = async (uid) => {
    try {
      const response = await fetchWithAuth("Team/RemoveMember", {
        body: { userId: uid, teamId: id },
        method: "POST",
      });
      const data = response.data;
      if (response.code == "200") {
        console.log(data);
        addToast("success", "Thành công", 5000);
        loadData();
        searchTeams(search);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const loadData = async () => {
    try {
      const response = await getWithAuth("Team/GetById?teamId=" + id);
      const data = response.data;
      if (response.code == "200") {
        console.log(data);

        setTeam(data);
        setName(data.name);
        setManager(data.manager);
        setDescription(data.description);
        console.log(data);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const searchTeams = async (str) => {
    try {
      const response = await getWithAuth(
        "Users/SearchByTeamMember?id=" + id + "&name=" + str
      );
      const data = response.data;
      if (response.code == "200") {
        // console.log(data);
        const teamMembersWithKey = data.map((member) => ({
          ...member,
          key: member.id, // Hoặc sử dụng một thuộc tính duy nhất khác
        }));
        setTeamMembers(teamMembersWithKey);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const dateString = (str) => {
    if (!str) return "";
    return str.split("T")[0];
  };
  const btnSearchClick = () => {
    searchTeams(search);
  };
  function openModal() {
    setOptions([]);
    setIsModalOpen(true);
  }
  function closeModal() {
    console.log("ok");
    setIsModalOpen(false);
  }
  async function onBtnClick() {
    try {
      let selectedValue = [];
      member.forEach((element) => {
        selectedValue.push(element.value);
      });
      const response = await fetchWithAuth("Team/AddMember", {
        method: "POST",
        body: { userIds: selectedValue, teamId: id },
      });
      const data = response.data;
      if (response.code == "200") {
        setIsModalOpen(false);
        setMember(null);
        loadData();
        searchTeams("");
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
  }
  const callLog = (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // console.log("OK checker: " + value);
      searchUserList(value);
    }, 1000);
  };
  const searchUserList = async (str) => {
    try {
      const response = await getWithAuth(
        "Users/SearchByNameOrEmail",
        str ? "name=" + str : ""
      );
      const data = response.data;
      if (response.code == "200") {
        console.log(data);

        data.forEach((element) => {
          element.value = element.id;
          element.label = element.fullName;
          if (element.teamId != null) {
            if (element.teamId == id)
              element.label = element.fullName + "(Đã có)";
            element.disabled = true;
          }
        });
        setOptions(data);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const saveChange = async () => {
    try {
      const response = await fetchWithAuth("Team/UpdateTeam", {
        method: "POST",
        body: {
          id: id,
          name: name,
          description: description,
          managerId: manager.id,
        },
      });
      const data = response.data;
      console.log(data);
      if (response.code == "200") {
        loadData();
        addToast(
          "success",
          "Lưu thay đổi thành công",
          5000
        );
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    loadData();
    searchTeams("");
  }, []);
  return (
    <>
      <div className=" flex justify-between items-center">
        <p className="my-6 text-2xl font-semibold text-gray-200">
          Thông tin phòng ban
        </p>
        <Button type="primary" size="large" onClick={openModal}>
          <i className="fa-solid fa-plus"></i>Thêm người
        </Button>
      </div>
      <Card className=" shadow-md border-0">
        <div className="flex gap-4">
          <div className="basis-1/2">
            <label>Tên phòng ban</label>
            <Input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full mt-1"
              placeholder="Phòng công vụ"
              value={name}
            ></Input>
          </div>
          <div className="basis-1/4">
            <label>Ngày tạo</label>
            <Input
              disabled
              type="date"
              className="w-full mt-1"
              placeholder="Phòng công vụ"
              value={dateString(team.createTime)}
            ></Input>
          </div>
          <div className="basis-1/4">
            <label>Ngày cập nhật</label>

            {/* <DatePicker value={Date(team.updateTime)} format={"dd-MM-yyyy"} /> */}
            <Input
              disabled
              type="date"
              className="w-full mt-1"
              placeholder="Phòng công vụ"
              value={dateString(team.updateTime)}
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 mt-3">
          <div className="basis-full">
            <label>Mô tả</label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="w-full mt-1"
              placeholder="Phòng công vụ"
              value={description}
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
              value={manager.fullName}
            ></Input>
          </div>
          <div className="basis-1/3">
            <label>Email Người quản lý</label>
            <Input
              type="Text"
              className="w-full mt-1"
              placeholder="email@mail.com"
              disabled
              value={manager.email}
            ></Input>
          </div>
          <div className="basis-1/3">
            <label>SĐT Người quản lý</label>
            <Input
              type="Text"
              className="w-full mt-1"
              placeholder="09xxxx"
              disabled
              value={manager.phoneNumber}
            ></Input>
          </div>
        </div>
        <div className={dataChange ? "flex justify-end mt-3" : "hidden"}>
          <Button onClick={saveChange} type="primary" size="large">
            Lưu thay đổi
          </Button>
        </div>
      </Card>
      <div className=" flex justify-between">
        <p className="my-6 text-xl font-semibold text-gray-200">
          Danh sách thành viên ({team.numberOfMember})
        </p>
      </div>
      <Card className=" shadow-md border-0">
        <Input
          className="mb-3 p-2 w-1/2 mr-3"
          type="text"
          placeholder="Tên, email người dùng"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></Input>
        <Button
          type="primary"
          size="large"
          className="h-full"
          onClick={btnSearchClick}
        >
          <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
        </Button>
        <Table columns={columns} dataSource={teamMembers} />
      </Card>
      <Modal
        title="Thêm người dùng vào phòng ban"
        open={isModalOpen}
        onOk={onBtnClick}
        onCancel={closeModal}
      >
        <Label className="mt-4">
          <span className="">Người dùng</span>
          <Select
            mode="multiple"
            allowClear
            value={member}
            onChange={(value) => setMember(value)}
            //   className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
            className="w-full mt-1"
            showSearch
            labelInValue
            filterOption={false}
            onSearch={callLog}
            notFoundContent={false ? <Spin size="small" /> : null}
            options={options}
          />
        </Label>
      </Modal>
    </>
  );
};
export default TeamDetail;
