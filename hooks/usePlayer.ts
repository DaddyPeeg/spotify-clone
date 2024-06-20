import shuffle from "@/utils/shuffleItems";
import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  isPlaying: boolean;
  setIsPlaying: (play: boolean) => void;
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  repeatOne: boolean;
  setRepeatOne: (repeatOne: boolean) => void;
  isShuffle: boolean;
  setIsShuffle: (isShuffle: boolean) => void;
  temporaryIds: string[];
  events: {
    onPlay: () => void | undefined;
    onPause: () => void | undefined;
  };
  setEvents: (onPlay: () => void, onPause: () => void) => void;
  setPlay: (fn: () => void) => void;
  setPause: (fn: () => void) => void;
}

const usePlayer: any = create<PlayerStore>((set) => ({
  ids: [],
  temporaryIds: [],
  activeId: undefined,
  isPlaying: false,
  setIsPlaying: (play: boolean) => set({ isPlaying: play }),
  events: {
    onPlay: () => {},
    onPause: () => {},
  },
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () =>
    set({ ids: [], activeId: undefined, repeatOne: false, isShuffle: false }),
  repeatOne: false,
  setRepeatOne: (repeatOne: boolean) => set({ repeatOne: repeatOne }),
  isShuffle: false,
  setIsShuffle: (isShuffle: boolean) => {
    if (usePlayer.getState().ids.length > 0) {
      if (isShuffle) {
        return set({
          isShuffle: isShuffle,
          temporaryIds: [...usePlayer.getState().ids],
          ids: [...shuffle(usePlayer.getState().ids)],
        });
      }
      return set({
        isShuffle: isShuffle,
        ids: [...usePlayer.getState().temporaryIds],
        temporaryIds: [],
      });
    }
  },
  setEvents: (onPlay: () => void, onPause: () => void) => {
    return set({ events: { onPlay, onPause } });
  },
  setPlay: () => {
    usePlayer.getState().events.onPlay();
    return set({
      isPlaying: true,
    });
  },
  setPause: () => {
    usePlayer.getState().events.onPause();
    return set({ isPlaying: false });
  },
}));

export default usePlayer;
