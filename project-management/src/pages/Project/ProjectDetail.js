import React, { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import ProjectItem from "../../components/Projects/ProjectItem";
const ProjectDetail = () => {
  return (
    <>
      <div className=" flex justify-between">
        <PageTitle>Danh sách phòng ban</PageTitle>
        <button className="bg-purple-700 h-12 self-center rounded-lg px-4 text-white">
          <i className="fa-solid fa-plus mr-2"></i>Thêm mới
        </button>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <ProjectItem></ProjectItem>
        <ProjectItem></ProjectItem>
      </div>
    </>
  );
};
export default ProjectDetail;
