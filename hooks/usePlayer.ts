import shuffle from "@/utils/shuffleItems";
import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  repeatOne: boolean;
  setRepeatOne: (repeatOne: boolean) => void;
  isShuffle: boolean;
  setIsShuffle: (isShuffle: boolean) => void;
  temporaryIds: string[];
}

const usePlayer: any = create<PlayerStore>((set) => ({
  ids: [],
  temporaryIds: [],
  activeId: undefined,
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
}));

export default usePlayer;
