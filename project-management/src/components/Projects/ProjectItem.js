import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, CardBody, Progress } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const ProjectItem = ({
  id,
  name,
  lead,
  status,
  coverUrl,
  deleteCallBack = async (id) => {},
  editCallBack = () => {},
}) => {
  const navigate = useNavigate();
  const forward1 = () => {
    navigate("/app/projects/" + id);
    // window.location.href = "/app";
  };
  return (
    <Card
      bordered={false}
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
    >
      <div className="flex flex-col gap-2 justify-between h-full">
        <div>
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
        </div>
        <div>
          <div className="flex items-center mb-2">
            <Progress
              percent={status}
              percentPosition={{ align: "center", type: "inner" }}
              size={["100%", 20]}
            />
          </div>

          <div className="flex justify-center gap-2">
            <Button
              onClick={forward1}
              type="primary"
              shape="circle"
              size="large"
            >
              <i className="fa-solid fa-eye"></i>
            </Button>
            {status == 0 && (
              <Button
                onClick={() => {
                  deleteCallBack(id);
                }}
                type="primary"
                danger
                shape="circle"
                size="large"
              >
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ProjectItem;
