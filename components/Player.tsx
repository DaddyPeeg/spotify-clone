"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import React, { Suspense } from "react";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();

  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  if (player.activeId && (!song || !songUrl)) {
    return (
      <div className="fixed bottom-0 w-full py-2 h-[100px] px-4 animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-3 h-full gap-x-2">
          <div className="md:flex hidden items-center">
            <div className="flex items-center gap-x-2 rounded-md bg-gray-700/20 p-2">
              <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700/50 w-12"></div>
              <div className="flex-col flex gap-y-2">
                <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700/50 w-48"></div>
                <div className="h-2.5 bg-gray-200 rounded-md dark:bg-gray-700/50 w-32"></div>
              </div>
            </div>
            <div className="h-5 ml-2 bg-gray-200 rounded-md dark:bg-gray-700/50 w-5"></div>
          </div>
          <div className="flex items-center col-span-2 md:col-span-1 flex-col gap-y-2 justify-center">
            <div className="flex gap-x-4 justify-center items-center">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700/50 w-4" />
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700/50 w-6" />
              <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700/50 w-12" />
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700/50 w-6" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700/50 w-4" />
            </div>
            <div className="flex gap-x-2 items-center w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700/50 w-12" />
              <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700/50 w-full" />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700/50 w-12" />
            </div>
          </div>
          <div className="md:flex hidden items-center justify-end gap-x-2">
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700/50 w-6" />
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700/50 w-[96px]" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (song && songUrl) {
    return (
      <div className="fixed bottom-0  w-full py-2 h-[100px] px-4">
        <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
      </div>
    );
  }
};

export default Player;
