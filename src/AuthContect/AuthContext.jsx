import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function ContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null)
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setAccessToken(localStorage.getItem("accessToken"));
        }
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}