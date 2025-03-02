"use client";

import { getPageInfosFromTitle } from "@repo/wikipedia/utils/page";
import { getLanguageFromUrl, getTitleFromUrl } from "@repo/wikipedia/utils/url";
import { ElementRef, useEffect, useRef, useState } from "react";

export default function Game() {
  const [page, setPage] = useState<string | null>(null);

  const [infos, setInfos] = useState<Awaited<
    ReturnType<typeof getPageInfosFromTitle>
  > | null>(null);

  useEffect(() => {
    async function fetchData() {
      // const data = await getPageInfo("Chess");
      // setPage(data);
    }

    fetchData();
  }, []);

  const containerRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const ref = containerRef.current;
    function clickHandler(e) {
      if (e.target?.tagName !== "A") return;
      e.preventDefault();
      console.log(e.target?.href);
    }

    ref?.addEventListener("click", clickHandler);
    ref?.addEventListener("auxclick", clickHandler);
    ref?.addEventListener("contextmenu", clickHandler);

    async function hoverHandler(e) {
      if (e.target?.tagName !== "A") return;
      const lang = getLanguageFromUrl(e.target.href);
      const title = getTitleFromUrl(e.target.href);

      const pageInfos = await getPageInfosFromTitle(lang, title);

      setInfos(pageInfos);
    }

    ref?.addEventListener("mouseover", hoverHandler);

    return () => {
      ref?.removeEventListener("click", clickHandler);
      ref?.removeEventListener("auxclick", clickHandler);
      ref?.removeEventListener("contextmenu", clickHandler);
      ref?.removeEventListener("mouseover", hoverHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className="[&_a]:visited:text-red-500">
      <div className="absolute top-0 right-0 max-w-2xl rounded-xl border border-zinc-700 p-12">
        <img
          src={infos?.thumbnail?.source}
          alt={infos?.title}
          className="w-full"
          width={infos?.thumbnail?.width}
          height={infos?.thumbnail?.height}
        />
        <h1>{infos?.title}</h1>
        <p className="line-clamp-4">{infos?.extract}</p>
      </div>

      <p>{page?.title}</p>
      <p>{page?.description}</p>

      <p>{page?.extract}</p>

      <div className="flex items-center gap-4">
        <a href="#abc">abc</a>
        <a href="https://google.com">google</a>
        <a href="https://en.wikipedia.org/wiki/Main_Page">wiki</a>
        <a href="https://en.wikipedia.org/wiki/Chess">chess</a>
        <a href="https://en.wikipedia.org/wiki/Speedcubing">Speedcubing</a>
        <a href="https://en.wikipedia.org/wiki/Chile">Chile</a>
        <a href="https://en.wikipedia.org/wiki/France">France</a>
        <a href="#def">def</a>
        <a href="#ghi">ghi</a>
        <a href="#jkl">jkl</a>
        <a href="#mno">mno</a>
      </div>
    </div>
  );
}
