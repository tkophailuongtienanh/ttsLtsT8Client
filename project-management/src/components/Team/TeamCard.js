import React from "react";
import { Card, CardBody } from "@windmill/react-ui";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../../icons";

function TeamCard({ title, detail, numberOfMember, editCallBack, deleteCallBack, taskCallback }) {
  return (
    <Card>
      <CardBody className="flex items-center">
        <div className="flex flex-col w-full">
          <p className="">
            <div className="text-lg text-white font-bold uppercase">
              Phòng ban: {title}
            </div>
          </p>
          <p>
            <div className="text-white truncate">
              {detail && "(" + detail + ")"}
            </div>
          </p>
          <p className="my-4">
            <span className="mb-2 text-sm font-medium text-gray-400">
              Số thành viên:{" "}
            </span>
            <span className="text-md font-semibold text-gray-200">
              {numberOfMember}{" "}
            </span>
            <span className="text-gray-200 ">
              <i class="fa-solid fa-users"></i>
            </span>
          </p>
          <p>
            <span className="mb-2 text-sm font-medium text-gray-400">
              Quản lý:{" "}
            </span>
            <span className="text-md font-semibold text-gray-200">
              Lương Tiến Anh
            </span>
          </p>
          <div className="flex justify-end">
            <button onClick={editCallBack} className="bg-green-500 text-white mr-2 w-10 h-10 rounded-full">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onClick={taskCallback} className="bg-green-500 text-white mr-2 w-10 h-10 rounded-full">
              <i class="fa-solid fa-file-lines"></i>
            </button>
            <button onClick={deleteCallBack} className="bg-red-500 text-white w-10 h-10 rounded-full">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TeamCard;
