import { createContext, useContext, useState } from "react";

export const SearchContext = createContext(undefined)

export function SearchContextProvider({children}) {
    const [search, setSearch] = useState('')

    const value = { search, setSearch, }

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearchContext() {
    return useContext(SearchContext)
}