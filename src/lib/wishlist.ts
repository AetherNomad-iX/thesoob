import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "soob-watchlist" },
  ),
);

type TrustState = {
  picks: [string, string, string];
  setPick: (index: 0 | 1 | 2, value: string) => void;
};

export const useTrustPicks = create<TrustState>()(
  persist(
    (set) => ({
      picks: ["", "", ""],
      setPick: (index, value) =>
        set((state) => {
          const next: [string, string, string] = [...state.picks];
          next[index] = value;
          return { picks: next };
        }),
    }),
    { name: "soob-trust-picks" },
  ),
);
