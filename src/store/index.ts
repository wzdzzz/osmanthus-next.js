import create from "zustand"

type Store = {
  count: number
  addCount: () => void
  subCount: () => void
}
export const useStore = create<Store>((set) => ({
  count: 1,
  addCount: () => set((state) => ({ count: state.count + 1 })),
  subCount: () => set((state) => ({ count: state.count - 1 })),
}))
