import React, { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import ProjectItem from "../../components/Projects/ProjectItem";
import { Button, Card, message, Select, Steps } from "antd";
import {
  AuditOutlined,
  BackwardOutlined,
  CarOutlined,
  CheckOutlined,
  ForwardOutlined,
  PrinterOutlined,
  SearchOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { Label } from "@windmill/react-ui";
import GGDrive from "../../components/GGDrive";
const steps = [
  {
    title: "Dự án",
    icon: <AuditOutlined />,
    content: "First-content",
  },
  {
    title: "Thiết kế",
    icon: <SlidersOutlined />,
    content: "2-content",
  },
  {
    title: "In ấn",
    icon: <PrinterOutlined />,
    content: "3-content",
  },
  {
    title: "Giao hàng",
    icon: <CarOutlined />,
    content: "4-content",
  },
];
const ProjectDetail = () => {
  const [current, setCurrent] = useState(1);
  const [approveOrNot, setApproveOrNot] = useState(null);
  const items = steps.map((item) => ({
    ...item,
    key: item.title,
    title: item.title,
  }));
  const startBtnClick = () => {
    setCurrent(current + 1);
  };
  const defuseBtnClick = () => {
    setCurrent(current + 1);
  };
  const approveBtnClick = () => {
    setCurrent(current + 1);
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <Steps
        type="navigation"
        className="my-3"
        current={current}
        items={items}
      />
      <Card className=" shadow-md border-0">
        {current === 0 && (
          <>
            <div className="flex">
              <div className="p-4 basis-1/3 overflow-hidden flex justify-center items-center">
                <GGDrive fileId="1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP"></GGDrive>
              </div>
              <div className="p-4 basis-1/3">
                <h1 className="font-bold text-xl">TTs T8 project</h1>
                <p className="mt-2">Ngày tạo: 25/8/2023</p>
                <p className="mt-2">Ngày tạo: 25/8/2023</p>
                <p className="mt-2">
                  Yêu cầu của khách hàng: 1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP
                  1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP
                  1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP
                  1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP
                </p>
                <p className="mt-2">
                  Yêu cầu của khách hàng: 1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP
                  1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP
                  1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP
                  1k6TDf4sFzjljfDb1OSBLoqGf6J7EMXgP
                </p>
              </div>
              <div className="p-2 basis-1/3 ">
                <div className="p-2 border rounded-lg h-full border-dotted flex flex-col justify-between">
                  <div>
                    <h1 className="font-bold text-xl">Thông tin dự án</h1>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg border-dotted">
                      <p className="font-bold">
                        Người phụ trách: Lương Tiến Anh
                      </p>
                      <p className="mt-2">Số điện thoại: 05222909291</p>
                      <p className="mt-2">Email: tienanh@email.com</p>
                    </div>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg border-dotted">
                      <p className="font-bold">
                        Người phụ trách: Lương Tiến Anh
                      </p>
                      <p className="mt-2">Số điện thoại: 05222909291</p>
                      <p className="mt-2">Email: tienanh@email.com</p>
                      <p className="mt-2">Địa chỉ: Hà Nội</p>
                    </div>
                  </div>
                  <div className="font-bold text-xl border-t-1 border-dotted">
                    Thành tiền: 100.000đ
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-4 flex flex-row-reverse">
              <Button
                type="primary"
                onClick={() => startBtnClick()}
                icon={<ForwardOutlined />}
                iconPosition="end"
                size="large"
              >
                Bắt đầu thiết kế
              </Button>
            </div>
          </>
        )}
        {current === 1 && (
          <>
            <div className="flex">
              <div className="basis-2/3">
              
              </div>
              <div className="p-2 basis-1/3 ">
                <div className="p-2 border rounded-lg h-full border-dotted flex flex-col justify-between">
                  <div>
                    <h1 className="font-bold text-xl">Thông tin dự án</h1>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg border-dotted">
                      <p className="font-bold">Dự án: TTT8</p>
                      <p className="mt-2">Quản lý: Lương Tiến Anh</p>
                      <p className="mt-2">Khách hàng: Lê Văn A</p>
                      <p className="mt-2">Yêu cầu: Nghêk thuật</p>
                    </div>
                    <Label className="my-3">
                      <span>Phê duyệt hoặc không phê duyệt</span>
                      <Select
                        className="w-full"
                        placeholder="---Lựa chọn---"
                        onChange={(value) => {
                          setApproveOrNot(value);
                        }}
                      >
                        <Select.Option value={true}>Phê duyệt</Select.Option>
                        <Select.Option value={false}>
                          Không phê duyệt
                        </Select.Option>
                      </Select>
                    </Label>

                    {approveOrNot == true && (
                      <Button onClick={approveBtnClick} type="primary" className="w-full">
                        Phê duyệt
                      </Button>
                    )}
                    {approveOrNot == false && (
                      <Button onClick={defuseBtnClick} type="primary" className="w-full">
                        Không phê duyệt
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
      <div className="hidden justify-between mt-4">
        <div>
          {current > 0 && (
            <Button
              onClick={() => prev()}
              icon={<BackwardOutlined />}
              size="large"
            >
              Bước trước
            </Button>
          )}
        </div>
        <div>
          {current < steps.length - 1 && (
            <Button
              className=""
              type="primary"
              onClick={() => next()}
              icon={<ForwardOutlined />}
              iconPosition="end"
              size="large"
            >
              Tiếp tục
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              icon={<CheckOutlined />}
              iconPosition="end"
              type="primary"
              size="large"
              onClick={() => message.success("Processing complete!")}
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default ProjectDetail;
