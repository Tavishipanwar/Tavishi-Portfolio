"use client";

import { useEffect, useState } from "react";

const titles = [
  "Tavishi | Portfolio",
  "Hey, come back!",
];

export default function PageTitle() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    document.title = isVisible ? titles[0] : titles[1];
  }, [isVisible]);

  return null;
}
