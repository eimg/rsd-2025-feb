import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [mode, setMode] = useState("light");

    return <AppContext.Provider value={{ mode, setMode }}>
        {children}
    </AppContext.Provider>
}
