import { useEffect, useRef, useState } from "react";
import usePlayer from "./usePlayer";

export default function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const animationId = useRef<number | null>(null);
  const [volume, setVolume] = useState(1);
  const [repeatOne, setRepeatOne] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const player = usePlayer();

  if (progressBarRef.current && audioRef.current) {
    progressBarRef.current.style.setProperty(
      "--seek-before-width",
      `${(elapsedTime / audioRef?.current?.duration) * 100}%`
    );
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      // console.log("duration", audioRef.current.duration);
      // console.log("readyState", audioRef.current.readyState);
    }
  }, [audioRef.current, audioRef?.current?.readyState]);

  useEffect(() => {
    const animate = () => {
      if (audioRef?.current) {
        setElapsedTime(audioRef?.current?.currentTime);
        animationId.current = requestAnimationFrame(animate);
      }
    };
    if (isPlaying) {
      animationId.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(animationId.current as number);
    };
  }, [isPlaying, audioRef.current]);

  const play = () => {
    setIsPlaying(true);
    audioRef?.current?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    audioRef?.current?.pause();
  };

  const reset = () => {
    if (audioRef.current && audioRef.current.currentTime !== undefined) {
      audioRef.current.currentTime = 0;
      setElapsedTime(0);
    }
  };

  if (elapsedTime === audioRef?.current?.duration && player.repeatOne) {
    reset();
    play();
  }

  const handleSeek = (num: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = num;
      setElapsedTime(num);
    }
  };

  return {
    progressBarRef,
    audioRef,
    isPlaying,
    play,
    pause,
    reset,
    handleSeek,
    elapsedTime,
    volume,
    setVolume,
    setRepeatOne,
    repeatOne,
    duration: audioRef?.current?.duration,
    isShuffle,
    setIsShuffle,
  };
}
