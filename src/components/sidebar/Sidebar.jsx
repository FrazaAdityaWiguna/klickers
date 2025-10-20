import clsx from "clsx";
import "./sidebar.css";

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={clsx(
        "bg-dark text-white d-flex flex-column p-3 transition-all",
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      )}
    >
      <h5 className="text-center mb-4">{collapsed ? "K" : "KlickGuard"}</h5>

      <nav className="nav flex-column">
        <a className="nav-link text-white" href="#">
          <i className="bi bi-inbox me-2"></i>
          {!collapsed && "Inbox"}
        </a>
        <a className="nav-link text-white" href="#">
          <i className="bi bi-shield-check me-2"></i>
          {!collapsed && "Risk Management"}
        </a>
        <a className="nav-link text-white" href="#">
          <i className="bi bi-graph-up me-2"></i>
          {!collapsed && "Reports"}
        </a>
        <a className="nav-link text-white" href="#">
          <i className="bi bi-gear me-2"></i>
          {!collapsed && "Settings"}
        </a>
      </nav>
    </aside>
  );
}
