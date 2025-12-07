import { useState, useEffect } from "react";

export default function HeroTypeText({ text, speed = 80 }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (text !== "") setDisplay(""); // reset only if text is not empty

    let i = 0;
    let interval = setInterval(() => {
      i = i + 1;
      setDisplay(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="typewriter-wrapper w-[350px] text-wrap ">{display}</span>
  );
}
