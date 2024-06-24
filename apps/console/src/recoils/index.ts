import { atom, recoilPersist, selector } from '@packages/ui/providers/index'

const { persistAtom } = recoilPersist()

export enum LayoutSettings {
  List = 'list',
  Grid = 'grid',
}

export const layoutSettingsAtom = atom({
  key: 'layoutSettingsAtom',
  default: LayoutSettings.List,
  effects: [persistAtom],
})

export const layoutListSelector = selector({
  key: 'layoutListSelector',
  get: ({ get }) => {
    const layoutSettings = get(layoutSettingsAtom)
    return layoutSettings === LayoutSettings.List
  },
})

export const layoutGridSelector = selector({
  key: 'layoutGridSelector',
  get: ({ get }) => {
    const layoutSettings = get(layoutSettingsAtom)
    return layoutSettings === LayoutSettings.Grid
  },
})
