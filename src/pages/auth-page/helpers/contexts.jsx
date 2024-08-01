import { createContext, useContext, useState } from "react";

// #region auth context
const AuthContext = createContext();
export const AuthContextProvider = ({children,value})=>{
  const [user,setUser] = useState(null);
  const context = {
    user,
    setUser
  }
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
// #endregion


export default function useAuthContext() {
  return useContext(AuthContext);
}