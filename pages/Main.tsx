import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import Intro from "./main/Intro";
import Now from "./main/Now";
import Prev from "./main/Prev";
import Location from "./main/Location";
import NavBar from "./components/NavBar";

interface Props {
  handleScrollView: (event: React.MouseEvent<HTMLElement>) => void;
  navName: string;
}

export default function Main() {
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const [navName, setNavName] = useState("intro");

  useLayoutEffect(() => {
    if (window) {
      window.scroll(0, Number(sessionStorage.y));
    }
  }, []);

  useEffect(() => {
    if (scrollRef) {
      let observer: IntersectionObserver;
      observer = new IntersectionObserver(
        ([event]) => {
          const target = event.target as HTMLElement;
          if (event.isIntersecting) {
            setNavName(target.id);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(scrollRef.current[0] as Element);
    }
  }, [scrollRef]);

  useEffect(() => {
    if (scrollRef) {
      let observer: IntersectionObserver;
      observer = new IntersectionObserver(
        ([event]) => {
          const target = event.target as HTMLElement;
          if (event.isIntersecting) {
            setNavName(target.id);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(scrollRef.current[1] as Element);
    }
  }, [scrollRef]);

  useEffect(() => {
    if (scrollRef) {
      let observer: IntersectionObserver;
      observer = new IntersectionObserver(
        ([event]) => {
          const target = event.target as HTMLElement;
          if (event.isIntersecting) {
            setNavName(target.id);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(scrollRef.current[2] as Element);
    }
  }, [scrollRef]);

  useEffect(() => {
    if (scrollRef) {
      let observer: IntersectionObserver;
      observer = new IntersectionObserver(
        ([event]) => {
          const target = event.target as HTMLElement;
          if (event.isIntersecting) {
            setNavName(target.id);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(scrollRef.current[3] as Element);
    }
  }, [scrollRef]);

  const handleScrollView = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const name = target.innerText;
    const category = {
      소개: 0,
      "현재 전시": 1,
      "지난 전시": 2,
      방문하기: 3,
    };
    if (
      name === "소개" ||
      name === "현재 전시" ||
      name === "지난 전시" ||
      name === "방문하기"
    ) {
      scrollRef.current[category[name]]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <NavBar handleScrollView={handleScrollView} navName={navName} />
      <div
        onClick={() => sessionStorage.setItem("y", String(window.pageYOffset))}
      >
        <div ref={(el) => (scrollRef.current[0] = el)} id="intro">
          <Intro />
        </div>
        <div ref={(el) => (scrollRef.current[1] = el)} id="now">
          <Now />
        </div>
        <div ref={(el) => (scrollRef.current[2] = el)} id="prev">
          <Prev />
        </div>
        <div ref={(el) => (scrollRef.current[3] = el)} id="location">
          <Location />
        </div>
      </div>
    </>
  );
}
