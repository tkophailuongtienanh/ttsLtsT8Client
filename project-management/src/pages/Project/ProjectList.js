import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import ProjectItem from "../../components/Projects/ProjectItem";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Pagination,
  Select,
  Spin,
  Upload,
} from "antd";
import { Label } from "@windmill/react-ui";

import ImageDefault from "../../assets/img/default-img.jpg";
import TextArea from "antd/es/input/TextArea";
import fetchWithAuth, { fetchForm, getWithAuth } from "../../utils/callApi";
import { useToast } from "../../context/ToastContext";
import { UploadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const PAGESIZE = 6;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
dayjs.extend(customParseFormat);
const ProjectList = () => {
  const dateFormat = "YYYY-MM-DD";
  let timeoutId;
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [request, setRequest] = useState("");
  const [endDate, setEndDate] = useState(dayjs(dayjs(), dateFormat));
  const [startDate, setStartDate] = useState(dayjs(dayjs(), dateFormat));
  const [price, setPrice] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [options, setOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(ImageDefault);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);

  const loadProjectList = async ( pageIndex = 0, pageSize = PAGESIZE) => {
    try {
      const response = await getWithAuth(
        "Project/GetProjectList",
        "pageIndex=" + pageIndex + "&pageSize=" + pageSize
      );
      const data = response.data;
      console.log(data);
      if (response.code == "200") {
        setData(data.list);
        setTotal(data.total);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const onOkBtnClick = async () => {
    try {
      const formData = new FormData();
      formData.append("File", file);
      formData.append("ProjectName", projectName);
      formData.append("Request", request);
      formData.append("CustomerId", customer.value);
      formData.append("StartDate", startDate);
      formData.append("EndDate", endDate);
      formData.append("Price", price);
      setIsModalOpen(false);
      addToast("alert", "Đang thêm dự án", 5000);
      const response = await fetchForm("Project/CreateProject", {
        body: formData,
      });
      const data = response.data;
      console.log(data);
      if (response.code == "200") {
        addToast("success", "Thêm dự án thành công", 5000);
        loadProjectList();
        clearModal();
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const searchUserList = async (str) => {
    try {
      const response = await getWithAuth(
        "Customer/getCustomerOptions",
        str ? "name=" + str : ""
      );
      const data = response.data;

      if (response.code == "200") {
        data.forEach((element) => {
          element.value = element.id;
          element.label = element.fullName + "-" + element.address;
        });
        console.log(data);
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
      searchUserList(value);
    }, 1000);
  };
  const onFileUpload = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const props = {
    onRemove: (file) => {
      setFile(null);
      setUrl(ImageDefault);
    },
    beforeUpload: (file) => {
      setUrl(URL.createObjectURL(file));
      console.log("before: ", file);
      setFile(file);
      return false;
    },
    file,
  };
  const clearModal = () => {
    setProjectName("");
    setRequest("");
    setCustomer(null);
    setStartDate(dayjs(dayjs(), dateFormat));
    setEndDate(dayjs(dayjs(), dateFormat));
    setFile(null);
    setUrl(ImageDefault);
  };
  const deleteCallBack = useCallback(async (id) => {
    try {
      const response = await fetchWithAuth("Project/DeleteProject", {
        body: id,
      });
      const data = response.data;
      if (response.code == "200") {
        loadProjectList();
        // setData(data.list);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  });
  const onChange = (curpage, pageSize) => {
    console.log(curpage);
    
    setCurrentPage(curpage);
    loadProjectList(curpage - 1, pageSize);
  };
  useEffect(() => {
    loadProjectList();
    searchUserList();
  }, []);

  return (
    <>
      <div className=" flex justify-between">
        <PageTitle>Danh sách dự án</PageTitle>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-700 h-12 self-center rounded-lg px-4 text-white"
        >
          <i className="fa-solid fa-plus mr-2"></i>Thêm mới
        </button>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 justify-items-stretch">
        {data.map((item) => (
          <ProjectItem
            key={item.id}
            id={item.id}
            name={item.projectName}
            lead={item.employee.fullName}
            status={parseInt(item.projectStatus)}
            coverUrl={BASE_URL + "Image/GetImage/" + item.file.driveFileId}
            deleteCallBack={deleteCallBack}
          ></ProjectItem>
        ))}
      </div><Pagination
          className="mt-2"
          align="end"
          current={currentPage}
          onChange={onChange}
          total={total}
          pageSize={PAGESIZE}
        />
      <Modal
        title="Thêm mới dự án"
        open={isModalOpen}
        onOk={onOkBtnClick}
        onCancel={closeModal}
      >
        <div className="flex gap-2">
          <div
            style={{
              width: "40%",
              paddingBottom: "40%",
              backgroundImage: `url(${url})`,
            }}
            className="rounded bg-cover bg-center"
          ></div>
          <Upload
            className="max-w-55/100 overflow-hidden"
            {...props}
            maxCount={1}
            onChange={onFileUpload}
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Tải ảnh lên...
            </Button>
          </Upload>
        </div>
        <Label className="mt-4">
          <span>Tên dự án</span>
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1"
            type="username"
            placeholder="Dự án A"
          />
        </Label>
        <Label className="mt-4">
          <span>Yêu cầu từ khách hàng</span>
          <TextArea
            className=" mt-1"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Yêu cầu từ khách hàng"
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
        </Label>
        <Label className="mt-4">
          <span className="">Khách hàng</span>
          <Select
            value={customer}
            onChange={(value) => setCustomer(value)}
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
        <Label className="mt-4">
          <span>Thời gian làm dự kiến</span>
          <RangePicker
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            className="w-full mt-1"
            // value={startDate}
            onChange={(date, dateString) => {
              console.log(dateString);
              setStartDate(dateString[0]);
              setEndDate(dateString[1]);
            }}
            format={dateFormat}
            defaultValue={[startDate, endDate]}
            minDate={dayjs()}
          />
        </Label>
        <Label className="mt-4">
          <span>Giá</span>
          <InputNumber
            value={price}
            onChange={(e) => setPrice(e)}
            className="mt-1 w-full"
            type="text"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\đ\s?|(,*)/g, "")}
            placeholder="Đơn giá"
          />
        </Label>
        {/* <Label className="mt-4">
          <span>Ngày kết thúc</span>
          <DatePicker
            className="w-full mt-1"
            // value={startDate}
            onChange={(date, dateString) => {
              setEndDate(dateString);
            }}
            format={dateFormat}
            defaultValue={endDate}
            minDate={dayjs()}
          />
        </Label> */}
      </Modal>
    </>
  );
};
export default ProjectList;
