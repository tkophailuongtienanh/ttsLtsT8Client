import React, { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
const ProjectList = () => {
  return (
    <>
      <div className=" flex justify-between">
        <PageTitle>Danh sách phòng ban</PageTitle>
        <button
          className="bg-purple-700 h-12 self-center rounded-lg px-4 text-white"
        >
          <i className="fa-solid fa-plus mr-2"></i>Thêm mới
        </button>
      </div>
      
    </>
  );
};
export default ProjectList;
