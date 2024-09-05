import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import ProjectItem from "../../components/Projects/ProjectItem";
import {
  Button,
  Card,
  DatePicker,
  InputNumber,
  message,
  Modal,
  Select,
  Steps,
  Upload,
} from "antd";
import {
  AuditOutlined,
  BackwardOutlined,
  CarOutlined,
  CheckOutlined,
  ForwardOutlined,
  PrinterOutlined,
  SearchOutlined,
  SlidersOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Label } from "@windmill/react-ui";
import GGDrive from "../../components/GGDrive";
import { useParams } from "react-router-dom";
import fetchWithAuth, { fetchForm, getWithAuth } from "../../utils/callApi";
import dayjs from "dayjs";
import { useToast } from "../../context/ToastContext";
import ImageDefault from "../../assets/img/default-img.jpg";
import DesignItem from "../../components/Projects/DesignItem";
import Dragger from "antd/es/upload/Dragger";

const DESIGNS_PAGE_SIZE = 8;

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
  const [current, setCurrent] = useState(0);
  //step 1
  const [step1Data, setStep1Data] = useState(step1def);
  //step 2
  const [designList, setDesignList] = useState([]);
  const [designPageIndex, setDesignPageIndex] = useState(0);
  const [designSelected, setDesignSelected] = useState(0);
  const [approveOrNot, setApproveOrNot] = useState(null);
  const [isAddDesignModalOpen, setIsAddDesignModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  //step 3
  const [machine, setMachine] = useState();
  const [machineList, setMachineList] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [designApprovedId, setDesignApprovedId] = useState(0);
  const [urlSelectedDesign, setUrlSelectedDesign] = useState("");
  //step 4
  const [shiper, setShiper] = useState();
  const [shiperOption, setShiperOption] = useState();
  const [estimateDate, setEstimate] = useState(dayjs());

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
        loadProcessingStep(data.projectStatus);
        //Step1
        if (data.projectStatus >= 0) {
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
        }
        //Step2
        if (data.projectStatus >= 25) {
          loadDesignsList();
        }
        //Step3
        if (data.projectStatus >= 50) {
          loadSelectedDesign();
        }
        if (data.projectStatus >= 75) {
          searchUserList();
        }
        if (data.projectStatus >= 100) setCurrent(4);
      } else {
        addToast("danger", data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  //step 1
  const startBtnClick = async () => {
    try {
      const response = await fetchWithAuth("Project/StartProject/" + id);
      const data = response.data;
      if (response.code == "200") {
        loadData();
        setCurrent(current + 1);
      } else {
        addToast("danger", data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  //step 2
  const loadDesignsList = async (
    pageIndex = designPageIndex,
    pageSize = DESIGNS_PAGE_SIZE
  ) => {
    try {
      const response = await getWithAuth(
        "Project/GetDesigns/" +
          id +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      );
      const data = response.data;
      if (response.code == "200") {
        // loadData();
        setDesignList(data.list);
      } else {
        addToast("danger", data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  const onDesignClick = useCallback((id) => {
    setDesignSelected(id);
  });
  const onAddDesignOkBtnClick = async () => {
    const form = new FormData();
    form.append("fileInput", file);
    setFile(null);
    setUrl("");
    setIsAddDesignModalOpen(false);
    addToast("alert", "Đang thêm dữ liệu", 5000);
    try {
      const response = await fetchForm("Project/UploadDesign/" + id, {
        body: form,
      });
      const data = response.data;
      if (response.code == "200") {
        addToast("success", "Thêm thiết kế thành công", 5000);
        loadDesignsList();
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  const closeAddDesignModal = () => {
    setIsAddDesignModalOpen(false);
  };
  const onFileUpload = (file) => {
    setUrl(URL.createObjectURL(file));
    setFile(file);
    return false;
  };
  const defuseBtnClick = async () => {
    if (designSelected == 0) return;
    try {
      const response = await fetchForm(
        "Project/DefuseDesign/" + designSelected
      );
      const data = response.data;
      if (response.code == "200") {
        addToast("success", "Cập nhật thành công", 5000);
        loadDesignsList();
      } else if (response.code) {
        addToast("danger", response.code + ": " + data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  const approveBtnClick = async () => {
    if (designSelected == 0) return;
    try {
      const response = await fetchForm(
        "Project/ApproveDesign/" + designSelected
      );
      const data = response.data;
      if (response.code == "200") {
        addToast("success", "Cập nhật thành công", 5000);
        loadDesignsList();
        setCurrent(current + 1);
      } else if (response.code) {
        addToast("danger", response.code + ": " + data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  //Step 3
  const loadSelectedDesign = async () => {
    try {
      const response = await getWithAuth("Project/GetDesignApproved/" + id);
      const data = response.data;
      if (response.code == "200") {
        setDesignApprovedId(data.id);
        setUrlSelectedDesign(
          process.env.REACT_APP_API_BASE_URL +
            "Image/GetImage/" +
            data.file.driveFileId
        );
      }
    } catch (error) {}
  };
  const getMachinesList = async () => {
    try {
      const response = await getWithAuth("Project/GetMachines");
      const data = response.data;
      console.log(data);

      if (response.code == "200") {
        // addToast("success", "Cập nhật thành công", 5000);
        // loadDesignsList();
        data.list.forEach((element) => {
          element.value = element.id;
          element.label = element.propertyDetailName;
          element.selected = true;
        });
        setMachineList(data.list);
      } else if (response.code) {
        addToast("danger", response.code + ": " + data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  const getResourcesList = async () => {
    try {
      const response = await getWithAuth("Project/GetResource");
      const data = response.data;
      console.log(data);

      if (response.code == "200") {
        // addToast("success", "Cập nhật thành công", 5000);
        // loadDesignsList();
        data.list.forEach((element) => {
          element.value = element.id;
          element.selected = 0;
        });
        setResourceList(data.list);
      } else if (response.code) {
        addToast("danger", response.code + ": " + data.message, 10000);
      }
    } catch (error) {
      addToast("danger", error.message, 10000);
    }
  };
  const updateSelectedResource = (id, value) => {
    resourceList.forEach((element) => {
      if (element.id == id) {
        element.selected = value;
      }
    });
    setResourceList(resourceList);
  };
  const confirmPrint = () => {
    console.log("machine", machine.value);
    const input = resourceList.map((item) => ({
      id: item.id,
      quantity: item.selected,
    }));
    try {
      const response = fetchWithAuth(
        "Project/ConfirmResourceForPrint/" + designApprovedId,
        {
          body: { Printer: machine.value, Resources: input },
        }
      );
    } catch (error) {}
  };
  const loadUsedResource = async () => {
    try {
      const response = await getWithAuth(
        "Project/GetUsedResource/" + designApprovedId
      );
      const data = response.data;
      if (response.code == "200") {
        console.log(data);

        // data.forEach((element) => {
        //   element.value = element.id;
        //   element.label = element.fullName;
        // });
        // setShiperOption(data);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  //Step 4
  const searchUserList = async (str) => {
    try {
      const response = await getWithAuth(
        "Users/SearchShipperByNameOrEmail",
        str ? "name=" + str : ""
      );
      const data = response.data;
      if (response.code == "200") {
        data.forEach((element) => {
          element.value = element.id;
          element.label = element.fullName;
        });
        setShiperOption(data);
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    } catch (error) {}
  };
  const ConfirmShipping = async () => {
    try {
      const response = await fetchWithAuth("Project/ConfirmShip/" + id, {
        body: { ShiperId: shiper.value, EstimateTime: estimateDate },
      });
      if (response.code == "200") {
        addToast("success", response.data.message, 5000);
        setCurrent(current + 1);
      }
    } catch (error) {}
  };
  //
  const loadProcessingStep = (process) => {
    if (process >= 0) setCurrent(0);
    if (process >= 25) setCurrent(1);
    if (process >= 50) setCurrent(2);
    if (process >= 75) setCurrent(3);
    if (process >= 100) setCurrent(4);
  };
  useEffect(() => {
    loadData();
    getMachinesList();
    getResourcesList();
  }, []);
  return (
    <>
      <Steps
        type="navigation"
        className="my-3"
        current={current}
        items={items}
      />
      <Card className=" shadow-md border-0 ">
        <div className="flex flex-col gap-5">
          {(current === 0 || current == 4) && (
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
                        <p className="mt-2">Email: {step1Data.leadEmail}</p>
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
              {current != 4 && (
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
              )}
            </>
          )}
          {(current === 1 || current == 4) && (
            <>
              {current != 4 && (
                <div>
                  <Button
                    type="primary"
                    onClick={() => setIsAddDesignModalOpen(true)}
                  >
                    <i className="fa-solid fa-plus"></i>Thêm thiết kế
                  </Button>
                </div>
              )}
              <div className="flex gap-3 mt-3">
                <div className="basis-2/3">
                  <div className="grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-3 justify-items-stretch">
                    {designList.map((item) => (
                      <DesignItem
                        key={item.id}
                        id={item.id}
                        isSelected={item.id == designSelected}
                        status={item.designStatus}
                        createName={item.designer.fullName}
                        createDate={dayjs(item.DesignTime).format("DD-MM-YYYY")}
                        imgUrl={
                          process.env.REACT_APP_API_BASE_URL +
                          "Image/GetImage/" +
                          item.file.driveFileId
                        }
                        callback={(id) => {
                          onDesignClick(id);
                        }}
                      ></DesignItem>
                    ))}
                  </div>
                </div>
                <div className=" basis-1/3 ">
                  <div className="p-2 border rounded-lg h-full border-dotted flex flex-col justify-between">
                    <div>
                      <h1 className="font-bold text-xl">Thông tin dự án</h1>
                      <div className="mt-2 p-3 bg-gray-700 rounded-lg border-dotted">
                        <p className="font-bold">
                          Dự án: {step1Data.projectName}
                        </p>
                        <p className="mt-2">Quản lý: {step1Data.leadName}</p>
                        <p className="mt-2">
                          Khách hàng: {step1Data.customerName}
                        </p>
                        <p className="mt-2">Yêu cầu: {step1Data.request}</p>
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
              <Modal
                title="Thêm thiết kế"
                open={isAddDesignModalOpen}
                onOk={onAddDesignOkBtnClick}
                onCancel={closeAddDesignModal}
              >
                {url != "" && (
                  <div
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      backgroundImage: "url(" + url + ")",
                    }}
                    className="bg-cover bg-center"
                  ></div>
                )}
                <div className="mt-3 flex justify-center">
                  <Upload
                    className=""
                    maxCount={1}
                    beforeUpload={(file) => {
                      onFileUpload(file);
                      return false;
                    }}
                    showUploadList={false}
                  >
                    <Button type="primary" icon={<UploadOutlined />}>
                      Tải ảnh lên...
                    </Button>
                  </Upload>
                </div>
              </Modal>
            </>
          )}
          {(current === 2 || current == 4) && (
            <>
              <div className="flex gap-10">
                <div className=" basis-1/2 overflow-hidden ">
                  <div className="w-full text-lg mb-3 font-bold">
                    Thiết kế đã duyệt:
                  </div>
                  <img className="rounded" src={urlSelectedDesign} />
                </div>
                <div className="basis-1/2">
                  <div className="w-full text-lg mb-3 font-bold">
                    Tài nguyên:
                  </div>
                  <Label>
                    Loại máy móc
                    <Select
                      value={machine}
                      onChange={(value) => setMachine(value)}
                      placeholder="---Lựa chọn---"
                      className="w-full mt-1"
                      labelInValue
                      filterOption={false}
                      options={machineList}
                      disabled={current == 4}
                    />
                  </Label>
                  <table className="table-auto w-full mt-3">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="px-4 py-2 text-left">Tài nguyên</th>
                        <th className="px-4 py-2 text-left">Số lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resourceList.map((item) => (
                        <tr key={item.id} className="border-b border-gray-600">
                          <td className="px-4 py-2">
                            {item.propertyDetailName}
                          </td>
                          <td className="px-4 py-2">
                            <InputNumber
                              min={0}
                              max={item.quantity}
                              defaultValue={item.selected}
                              onChange={(value) =>
                                updateSelectedResource(item.id, value)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {current != 4 && (
                <div className="flex justify-end">
                  <Button type="primary" onClick={() => confirmPrint()}>
                    Xác nhận
                  </Button>
                </div>
              )}
            </>
          )}
          {(current === 3 || current == 4) && (
            <>
              <div className="flex">
                <div className="basis-2/3">
                  <div className=" font-bold text-xl mb-3">
                    Thông tin đơn hàng
                  </div>
                  <div className="flex gap-3 text-base">
                    <div>
                      <div className="font-bold">Tên đơn hàng: </div>
                      <div className="font-bold">Tên khách hàng: </div>
                      <div className="font-bold">Số điện thoại: </div>
                      <div className="font-bold">Địa chỉ: </div>
                      <div className="font-bold">Thành tiền: </div>
                    </div>
                    <div>
                      <div className="font-bold"> {step1Data.projectName}</div>
                      <div> {step1Data.customerName}</div>
                      <div> {step1Data.customerPhone}</div>
                      <div> {step1Data.customerAddress}</div>
                      <div> {step1Data.totalMoney}</div>
                    </div>
                  </div>
                </div>
                <div className="basis-1/3">
                  Nhân viên giao hàng:
                  <Select
                    value={shiper}
                    onChange={(value) => setShiper(value)}
                    placeholder="---Lựa chọn---"
                    className="w-full mt-1"
                    labelInValue
                    filterOption={false}
                    options={shiperOption}
                  ></Select>
                  <div className="mt-3 mb-1">Thời gian giao hàng dự kiến</div>
                  <DatePicker
                    className="w-full mt-1"
                    // value={startDate}
                    onChange={(date, dateString) => {
                      setEstimate(dayjs(dateString, "DD-MM-YYYY").toDate());
                    }}
                    format={"DD-MM-YYYY"}
                    defaultValue={dayjs()}
                    minDate={dayjs()}
                  />
                  {current != 4 && (
                    <div className=" flex justify-end mt-3">
                      <Button onClick={() => ConfirmShipping()} type="primary">
                        Xác nhận
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </>
  );
};
export default ProjectDetail;
