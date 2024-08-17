import React from "react";
import { Card, CardBody } from "@windmill/react-ui";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../../icons";

function TeamCard({ title, detail, numberOfMember, manager, editCallBack, deleteCallBack, taskCallback }) {
  return (
    <Card>
      <CardBody className="flex items-center">
        <div className="flex flex-col w-full">
          <div className="">
            <p className="text-lg text-white font-bold uppercase">
              Phòng ban: {title}
            </p>
          </div>
          <div>
            <p className="text-white truncate">
              {detail && "(" + detail + ")"}
            </p>
          </div>
          <div className="my-4">
            <span className="mb-2 text-sm font-medium text-gray-400">
              Số thành viên:{" "}
            </span>
            <span className="text-md font-semibold text-gray-200">
              {numberOfMember}{" "}
            </span>
            <span className="text-gray-200 ">
              <i className="fa-solid fa-users"></i>
            </span>
          </div>
          <div>
            <span className="mb-2 text-sm font-medium text-gray-400">
              Quản lý:{" "}
            </span>
            <span className="text-md font-semibold text-gray-200">
              {manager.fullName}
            </span>
          </div>
          <div className="flex justify-end">
            <button onClick={editCallBack} className="bg-green-500 text-white mr-2 w-10 h-10 rounded-full">
              <i className="fa-solid fa-pen"></i>
            </button>
            <button onClick={taskCallback} className="bg-green-500 text-white mr-2 w-10 h-10 rounded-full">
              <i className="fa-solid fa-file-lines"></i>
            </button>
            <button onClick={deleteCallBack} className="bg-red-500 text-white w-10 h-10 rounded-full">
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TeamCard;
