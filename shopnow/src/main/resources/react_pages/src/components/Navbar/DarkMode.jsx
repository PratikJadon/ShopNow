import React, { useEffect, useState } from "react";
import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";

export const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  //   access to html element
  const element = document.documentElement;

  // Setting theme in localstorage and html element
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme == "dark") {
      element.classList.add("dark");
      element.classList.add("dark");
    } else {
      element.classList.remove("light");
      element.classList.remove("dark");
    }
  });

  return (
    <div className="relative">
      <img
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        src={LightButton}
        className={`w-12 cursor-pointer absolute right-0 z-10 ${
          theme == "dark" ? "opacity-0" : "opacity-100"
        } transition-all duration-300`}
      />
      <img
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        src={DarkButton}
        className={`w-12 cursor-pointer`}
      />
    </div>
  );
};
