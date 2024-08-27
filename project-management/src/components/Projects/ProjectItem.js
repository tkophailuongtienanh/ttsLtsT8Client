import { Card, CardBody, Progress } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const ProjectItem = ({ id, name, lead, status, coverUrl }) => {
  const navigate = useNavigate();
  const forward1 = () => {
    navigate("/app/projects/" + id);
    // window.location.href = "/app";
  };
  return (
    <Card
      bordered={false}
      hoverable
      cover={
        <div
          className="bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url(" + coverUrl + ")",
            width: "100%",
            paddingBottom: "100%",
          }}
        ></div>
      }
      onClick={forward1}
    >
      <div className="flex flex-col">
        <div className="font-bold text-lg">{name}</div>
        <div className="">
          Leader: <span className="font-bold">{lead}</span>
        </div>
        <div className="mb-3">
          Trạng thái:{" "}
          <span>
            {status <= 25
              ? "Chờ duyệt"
              : status <= 50
              ? "Đang in"
              : status <= 75
              ? "Đang giao hàng"
              : "Hoàn thành"}
          </span>
        </div>
        <Progress
          percent={status}
          percentPosition={{ align: "center", type: "inner" }}
          size={["100%", 20]}
        />
      </div>
    </Card>
  );
};
export default ProjectItem;
