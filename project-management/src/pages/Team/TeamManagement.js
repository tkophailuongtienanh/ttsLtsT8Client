import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import fetchWithAuth, { getWithAuth } from "../../utils/callApi";
import PageTitle from "../../components/Typography/PageTitle";
import RoundIcon from "../../components/RoundIcon";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../../icons";
import TeamCard from "../../components/Team/TeamCard";
import {
  Label,
  //   Input,
} from "@windmill/react-ui";
import { Input, Modal } from "antd";
import { Select, Spin } from "antd";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
const TeamManagement = () => {
  let timeoutId;
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [man, setMan] = useState(null);
  const [teams, setTeams] = useState([]);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    console.log("ok");
    setIsModalOpen(false);
  }
  const onBtnClick = async () => {
    console.log("nameRef", name);
    console.log("desRef", des);
    console.log("manRef", man);

    try {
      const response = await fetchWithAuth("Team/CreateNewTeam", {
        method: "POST",
        body: {
          name: name,
          description: des,
          managerId: man.value,
        },
      });
      const data = response.data;
      console.log(data);

      if (response.code == "200") {
        setName("");
        setDes("");
        setMan(null);
        setIsModalOpen(false);
        loadTeamsData();
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const searchUserList = async (str) => {
    try {
      const response = await getWithAuth(
        "Users/SearchByNameOrEmail",
        str ? "name=" + str : ""
      );
      const data = response.data;
      if (response.code == "200") {
        data.forEach((element) => {
          element.value = element.id;
          element.label = element.fullName;
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
  const callLog = (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // console.log("OK checker: " + value);
      searchUserList(value);
    }, 1000);
  };
  const loadTeamsData = async () => {
    try {
      const response = await getWithAuth("Team/GetAll");
      const data = response.data;
      if (response.code == "200") {
        console.log(data);
        setTeams(data);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const editBtnClick = useCallback((teamId) => {
    navigate("" + teamId);
  });
  const deleteBtnClick = useCallback(async (teamId) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa Phòng ban này không?")) {
        const response = await fetchWithAuth("Team/DeleteTeam", {
          method: "POST",
          body: teamId,
        });
        console.log(response.data);
        loadTeamsData();
      }
    } catch (error) {}
  });

  useEffect(() => {
    loadTeamsData();
    searchUserList("");
  }, []);
  return (
    <>
      <div className=" flex justify-between">
        <PageTitle>Danh sách phòng ban</PageTitle>
        <button
          onClick={openModal}
          className="bg-purple-700 h-12 self-center rounded-lg px-4 text-white"
        >
          <i className="fa-solid fa-plus mr-2"></i>Thêm mới
        </button>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            title={team.name}
            detail={team.description}
            numberOfMember={team.numberOfMember}
            manager={team.manager}
            editCallBack={() => {
              editBtnClick(team.id);
            }}
            deleteCallBack={() => {
              deleteBtnClick(team.id);
            }}
          ></TeamCard>
        ))}
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={onBtnClick}
        onCancel={closeModal}
      >
        <Label>
          <span>Tên phòng ban</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
            type="username"
            placeholder="Hội đồng"
          />
        </Label>
        <Label className="mt-4">
          <span>Mô tả</span>
          <Input
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className="mt-1"
            type="email"
            placeholder="hội đồng"
          />
        </Label>
        <Label className="mt-4">
          <span className="">Quản lý</span>
          <Select
            value={man}
            onChange={(value) => setMan(value)}
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
export default memo(TeamManagement);
