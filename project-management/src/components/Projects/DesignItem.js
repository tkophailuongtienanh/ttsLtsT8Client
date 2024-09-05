import { Tag } from "antd";
import React from "react";
const DesignItem = ({
  id,
  isSelected,
  status,
  createName,
  createDate,
  imgUrl,
  callback = (id) => {},
}) => {
  const onClick = (id) => {
    if (status != 2) return;
    else {
      callback(id);
    }
  };
  return (
    <div
      className={
        " rounded-lg overflow-hidden" +
        (isSelected ? " border-2 border-green-500" : " border border-gray-400")
      }
      onClick={() => onClick(id)}
    >
      <div
        className="bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url(" + imgUrl + ")",
          width: "100%",
          paddingBottom: "120%",
        }}
      ></div>
      <div className="p-3">
        <div>
          <span className="font-bold">Người tạo:</span> {createName}
        </div>
        <div>
          <span className="font-bold">Ngày tạo:</span> {createDate}
        </div>
        <div>
          <span className="font-bold mr-4">Trạng thái:</span>
          {status == 1 && <Tag color="success">Đã duyệt</Tag>}
          {status == 2 && <Tag color="processing">Chưa duyệt</Tag>}
          {status == 3 && <Tag color="error">Từ chối</Tag>}
        </div>
      </div>
    </div>
  );
};
export default DesignItem;
