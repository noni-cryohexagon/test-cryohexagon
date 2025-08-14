import { atom, useAtom } from "jotai";

export const dailyViewAtom = atom<boolean>(false);

export const useHideDailyView = () => {
  const [value, setValue] = useAtom(dailyViewAtom);
  return {
    value,
    setDailyViewHidden: (v: boolean) => setValue(v),
  };
};
