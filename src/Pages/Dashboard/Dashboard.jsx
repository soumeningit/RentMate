import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="bg-gray-50 p-6">
      <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblue-800">
        <Sidebar />
        <div className="h-[calc(100vh-3.5rem)] flex-1">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
