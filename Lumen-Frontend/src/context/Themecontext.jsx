
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [Imgtag, setImgtag] = useState("hero");


  useEffect(() => {

    if (theme === "dark") {
      localStorage.setItem("theme", "dark")

      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light")
    }
  }, [theme]);



  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setImgtag(theme === "dark" ? "dark" : "hero");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, Imgtag, isDarkMode: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}
