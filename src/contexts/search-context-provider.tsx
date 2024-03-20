"use client";

import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <SearchContext.Provider value={{ handleChangeSearchQuery, searchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
