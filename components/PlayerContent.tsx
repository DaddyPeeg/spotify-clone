"use client";

import { Song } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import useAudio from "@/hooks/useAudio";
import calculateTime from "@/utils/calculateTimeFormat";
import SongLoader from "./SongLoader";
import { TiArrowRepeat } from "react-icons/ti";
import { ImShuffle } from "react-icons/im";
import { twMerge } from "tailwind-merge";
import shuffle from "@/utils/shuffleItems";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer();

  console.log("logs", player.repeatOne, player.isShuffle);
  const {
    handleSeek,
    audioRef,
    volume,
    setVolume,
    progressBarRef,
    elapsedTime: customElapsedTime,
    play: customAudioPlay,
    pause: customAudioPause,
    isPlaying: customAudioIsPlaying,
    duration: customAudioDuration,
  } = useAudio();

  useEffect(() => {
    customAudioPlay();
  }, []);

  const Icon = customAudioIsPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex(
      (id: any) => id === player.activeId
    );
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex(
      (id: any) => id === player.activeId
    );
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const handlePlay = () => {
    if (!customAudioIsPlaying) {
      customAudioPlay();
    } else {
      customAudioPause();
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  };

  useEffect(() => {
    if (audioRef?.current && audioRef.current.ended && !player.repeatOne) {
      onPlayNext();
    }
  }, [audioRef?.current?.ended]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="w-full justify-start hidden md:flex">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} player />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex flex-col col-span-2 md:col-auto gap-y-4 max-w-[722px] w-full h-full overflow-hidden">
        <div className="flex items-center justify-center gap-x-4">
          <ImShuffle
            size={16}
            className={twMerge(
              " cursor-pointer md:hover:text-white transition",
              player.isShuffle ? "text-white" : "text-neutral-600"
            )}
            onClick={() => player.setIsShuffle(!player.isShuffle)}
          />
          <AiFillStepBackward
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onPlayPrevious}
          />
          <div
            onClick={handlePlay}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onPlayNext}
          />
          <TiArrowRepeat
            size={20}
            className={twMerge(
              " cursor-pointer md:hover:text-white transition",
              player.repeatOne ? "text-white" : "text-neutral-600"
            )}
            onClick={() => player.setRepeatOne(!player.repeatOne)}
          />
        </div>

        <div className="flex justify-center items-center gap-x-2 relative">
          <p className="text-xs absolute left-0">
            {calculateTime(customElapsedTime)}
          </p>
          {audioRef.current ? (
            <div className="flex group w-[calc(100%-80px)]">
              <input
                type="range"
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer range-xs progressBar relative outline-none before:absolute before:left-0 before:top-0 before:h-1 before:bg-green-500 before:rounded-full"
                max={customAudioDuration as number}
                ref={progressBarRef}
                value={customElapsedTime}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  handleSeek(newValue);
                }}
              />
            </div>
          ) : (
            <SongLoader />
          )}

          <p className="text-xs right-0 absolute">
            {customAudioDuration && !isNaN(customAudioDuration)
              ? calculateTime(customAudioDuration as number)
              : "00:00"}
          </p>
        </div>
      </div>
      <audio ref={audioRef}>
        <source src={songUrl} type="audio/mpeg" />
      </audio>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={25}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
