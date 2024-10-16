import {useContext} from "react";
import {DarkModeContext} from "../context/DarkModeContext.tsx";

export function useDarkMode() {
    const context = useContext(DarkModeContext)
    if (context === undefined) throw new Error('DarkModeContext used outside provider')

    return context
}
