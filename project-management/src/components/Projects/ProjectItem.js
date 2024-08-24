import { Card, CardBody, Progress } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const ProjectItem = () => {
  const navigate = useNavigate();
  const forward1 = () => {
    navigate("/app/projects/1");
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
            backgroundImage:
              "url(https://i.pinimg.com/736x/d6/46/02/d64602a7b954a8b2f09bac97a7911bf8.jpg)",
            width: "100%",
            paddingBottom: "100%",
          }}
        ></div>
      }
      onClick={forward1}
    >
      <div className="flex flex-col">
        <div className="font-bold text-lg">Dự án đầu tư vốn 1 tỷ con thỏ</div>
        <div className="">
          Leader: <span className="font-bold">Lương Tiến Anh</span>
        </div>
        <div className="mb-3">
          Trạng thái: <span>Đang tiến hành</span>
        </div>
        <Progress
          percent={60}
          percentPosition={{ align: "center", type: "inner" }}
          size={["100%", 20]}
        />
      </div>
    </Card>
  );
};
export default ProjectItem;
