import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

const FaviconSwitcher = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = theme === "dark"
        ? "/public/file-user-dark.svg"
        : "/public/file-user-light.svg";
    }
  }, [theme]);

  return null;
};

export default FaviconSwitcher;
