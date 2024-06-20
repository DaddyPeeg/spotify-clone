"use client";

import usePlayer from "@/hooks/usePlayer";
import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const PlayButton = ({ activeId }: { activeId: string }) => {
  const player = usePlayer();
  const nowPlaying = activeId === player.activeId;
  return (
    <button
      className={twMerge(
        "transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 hover:scale-110",
        nowPlaying
          ? "opacity-100 translate-y-0"
          : "group-hover:opacity-100 group-hover:translate-y-0"
      )}
    >
      {nowPlaying ? (
        <FaPause className="text-black" />
      ) : (
        <FaPlay className="text-black" />
      )}
    </button>
  );
};

export default PlayButton;
