import { createContext, PropsWithChildren, useContext } from "react";
import type { ConfigContextValue } from "./ConfigContext.types";

const ConfigContext = createContext<ConfigContextValue | null>(null)

export const ConfigProvider = ({ children }: PropsWithChildren) => {
  const names = ['Heejin', 'Hyunjin', 'Haseul', 'Vivi']
  const cardsPerPlayer = 7

  const value = {
    names,
    cardsPerPlayer
  }
  
  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => {
  const contextValue = useContext(ConfigContext)
  if (contextValue === null) {
    throw new Error('useConfig must be used within ConfigProvider')
  } 

  return contextValue;
}
