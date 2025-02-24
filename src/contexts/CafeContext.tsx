// contexts/CafeContext.tsx
import { createContext, useContext, useReducer } from "react";
import { cafeReducer, initialCafeState, CafeState, CafeAction } from "./cafeReducer";

interface CafeContextType {
  state: CafeState;
  dispatch: React.Dispatch<CafeAction>;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);


// Provider Component
export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cafeReducer, initialCafeState);

  return <CafeContext.Provider value={{ state, dispatch }}>{children}</CafeContext.Provider>;
};

// Hook สำหรับใช้ CafeContext
export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) throw new Error("useCafe must be used within a CafeProvider");
  return context;
};
