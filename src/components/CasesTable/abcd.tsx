import { atom, useAtom } from "jotai";
import { FooterProps } from "./Footer";

export const footerAtom = atom<FooterProps>({ stepNum: 0, totalSteps: 0, title: "", description: "", children: null });

export const useFooter = () => {
  const [value, setValue] = useAtom(footerAtom);
  return {
    value,
    setFooter: (v: FooterProps) => setValue(v),
  };
};
