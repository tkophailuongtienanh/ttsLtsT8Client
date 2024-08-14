import React, { useState } from "react";
import fetchWithAuth from "../../utils/callApi";
import PageTitle from "../../components/Typography/PageTitle";
import RoundIcon from "../../components/RoundIcon";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../../icons";
import TeamCard from "../../components/Team/TeamCard";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
} from "@windmill/react-ui";

const TeamManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  const onBtnClick = async () => {
    try {
      const response = await fetchWithAuth("Team/Demo2", {
        method: "POST",
      });
      console.log("hellp", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div className=" flex justify-between">
        <PageTitle>Danh sách phòng ban</PageTitle>
        <button
          onClick={openModal}
          className="bg-purple-700 h-12 self-center rounded-lg px-4 text-white"
        >
          <i class="fa-solid fa-plus mr-2"></i>Thêm mới
        </button>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <TeamCard title="Total clients" value="6389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </TeamCard>

        <TeamCard title="Account balance" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </TeamCard>

        <TeamCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </TeamCard>

        <TeamCard title="Pending contacts" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </TeamCard>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Thêm mới phòng ban</ModalHeader>
        <ModalBody>
          <Label>
            <span>Tên phòng ban</span>
            <Input className="mt-1" type="username" placeholder="Hội đồng" />
          </Label>
          <Label className="mt-4">
            <span>Mô tả</span>
            <Input className="mt-1" type="email" placeholder="hội đồng" />
          </Label>
          <Label className="mt-4">
            <span>Quản lý</span>
            <Input
              className="mt-1"
              placeholder="***************"
              type="text"
            />
          </Label>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default TeamManagement;
