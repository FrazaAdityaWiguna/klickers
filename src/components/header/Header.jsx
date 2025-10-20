"use client";

import Image from "next/image";

const Header = ({ onToggle }) => {
  return (
    <header className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom shadow-sm">
      <div style={{ cursor: "pointer" }} onClick={onToggle}>
        <i
          className="bi bi-list"
          style={{ color: "var(--color-text)", fontSize: 24 }}
        ></i>
      </div>

      <div className="d-flex align-items-center gap-3">
        <i className="bi bi-translate"></i>
        <i className="bi bi-bell"></i>
        <div className="d-flex align-items-center">
          <Image
            src="/avatar.png"
            alt="user"
            className="rounded-circle"
            width={32}
            height={32}
          />
          <span className="ms-2 fw-semibold">Super Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
