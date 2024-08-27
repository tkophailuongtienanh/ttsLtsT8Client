import React, { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import ProjectItem from "../../components/Projects/ProjectItem";
import { Button, message, Steps, theme } from "antd";
import {
  AuditOutlined,
  CarOutlined,
  LoadingOutlined,
  PrinterOutlined,
  SlidersOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const items = steps.map((item) => ({
    ...item,
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
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

      <div style={contentStyle}>
        {current === 0 && (
          <div className="flex">
            
          </div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default ProjectDetail;
