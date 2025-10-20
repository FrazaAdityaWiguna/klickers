"use client";

import { useState } from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="d-flex">
      <Sidebar collapsed={isCollapsed} />
      <div className="flex-grow-1 d-flex flex-column vh-100">
        <Header onToggle={() => setIsCollapsed(!isCollapsed)} />
        <main className="flex-grow-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
