"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toggleTheme } from "@/redux/slice/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <button
      className="btn btn-primary mt-3"
      onClick={() => dispatch(toggleTheme())}
    >
      Switch to {mode === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
