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
import { useParams } from "react-router-dom";
import fetchWithAuth, { fetchForm, getWithAuth } from "../../utils/callApi";
import dayjs from "dayjs";
import { useToast } from "../../context/ToastContext";
import ImageDefault from "../../assets/img/default-img.jpg";

function formatString(dateStr) {
  const date = Date.parse(dateStr);
  return date.Da;
}
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
const step1def = {
  projectName: "Tên dự án",
  startDate: "01-01-2000",
  endDate: "01-01-2000",
  request: "Yêu cầu khó hiểu của khách hàng",
  cover: { ImageDefault },
  leadName: "Tên quản lý",
  leadPhone: "0987654321",
  leadEmail: "abc@gmail.com",
  customerName: "Nguyễn Văn A",
  customerPhone: "0123456789",
  customerAddress: "XXXXXX",
  totalMoney: 1,
};
const ProjectDetail = () => {
  const { id } = useParams();
  const { addToast } = useToast();
  const [step1Data, setStep1Data] = useState(step1def);
  const [current, setCurrent] = useState(0);
  const [approveOrNot, setApproveOrNot] = useState(null);
  const items = steps.map((item) => ({
    ...item,
    key: item.title,
    title: item.title,
  }));
  const loadData = async () => {
    try {
      const response = await getWithAuth("Project/GetProject/" + id);
      const data = response.data;
      if (response.code == "200") {
        console.log(data);
        if (data.projectStatus == 0) {
          setCurrent(0);
          //data 1
          const data1 = {
            projectName: data.projectName,
            startDate: dayjs(data.startDate).format("DD-MM-YYYY"),
            endDate: dayjs(data.expectedEndDate).format("DD-MM-YYYY"),
            request: data.requestDescriptionFromCustomer,
            cover:
              process.env.REACT_APP_API_BASE_URL +
              "Image/GetImage/" +
              data.file.driveFileId,
            leadName: data.employee.fullName,
            leadPhone: data.employee.phoneNumber,
            leadEmail: data.employee.email,
            customerName: data.customer.fullName,
            customerPhone: data.customer.phoneNumber,
            customerAddress: data.customer.address,
            totalMoney: `${data.bills[0].totalMoney}đ`.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ),
          };
          setStep1Data(data1);
        } else if (data.projectStatus == 25) setCurrent(1);
        else if (data.projectStatus == 50) setCurrent(2);
        else if (data.projectStatus == 75) setCurrent(3);
        else if (data.projectStatus == 100) setCurrent(4);
      } else {
        addToast("danger", data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  const startBtnClick = async () => {
    try {
      const response = await fetchWithAuth("Project/StartProject/" + id);
      const data = response.data;
      if (response.code == "200") {
        loadData();
      } else {
        addToast("danger", data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
    setCurrent(current + 1);
  };
  const defuseBtnClick = () => {
    setCurrent(current + 1);
  };
  const approveBtnClick = () => {
    setCurrent(current + 1);
  };
  useEffect(() => {
    loadData();
  }, []);
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
                {/* <GGDrive fileId={step1Data.cover}></GGDrive> */}
                <img src={step1Data.cover} />
              </div>
              <div className="p-4 basis-1/3">
                <h1 className="font-bold text-xl">{step1Data.projectName}</h1>
                <p className="mt-2">Ngày tạo: {step1Data.startDate}</p>
                <p className="mt-2">Ngày tạo: {step1Data.endDate}</p>
                <p className="mt-2">
                  Yêu cầu từ khách hàng: <br />
                  {step1Data.request}
                </p>
              </div>
              <div className="p-2 basis-1/3 ">
                <div className="p-2 border rounded-lg h-full border-dotted flex flex-col justify-between">
                  <div>
                    <h1 className="font-bold text-xl">Thông tin dự án</h1>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg border-dotted">
                      <p className="font-bold">
                        Người phụ trách: {step1Data.leadName}
                      </p>
                      <p className="mt-2">
                        Số điện thoại: {step1Data.leadPhone}
                      </p>
                      <p className="mt-2">Email: {step1Data.leadPhone}</p>
                    </div>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg border-dotted">
                      <p className="font-bold">
                        Khách hàng: {step1Data.customerName}
                      </p>
                      <p className="mt-2">
                        Số điện thoại: {step1Data.customerPhone}
                      </p>
                      <p className="mt-2">
                        Địa chỉ: {step1Data.customerAddress}
                      </p>
                    </div>
                  </div>
                  <div className="font-bold text-xl border-t-1 border-dotted">
                    Thành tiền: {step1Data.totalMoney}
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
              <div className="basis-2/3"></div>
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
                      <Button
                        onClick={approveBtnClick}
                        type="primary"
                        className="w-full"
                      >
                        Phê duyệt
                      </Button>
                    )}
                    {approveOrNot == false && (
                      <Button
                        onClick={defuseBtnClick}
                        type="primary"
                        className="w-full"
                      >
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
    </>
  );
};
export default ProjectDetail;
