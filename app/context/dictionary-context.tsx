"use client";

import { createContext, useContext } from "react";

type DictionaryContextType = {
  lang: string;
  dict: any;
};

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

export const DictionaryProvider = ({
  children,
  lang,
  dict
}: {
  children: React.ReactNode;
  lang: string;
  dict: any;
}) => {
  return (
    <DictionaryContext.Provider value={{ lang, dict }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = (): DictionaryContextType => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
};