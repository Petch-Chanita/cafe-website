// contexts/CafeContext.tsx
import { createContext, useContext, useEffect, useReducer } from "react";
import { cafeReducer, initialCafeState, CafeState, CafeAction } from "./cafeReducer";
import { checkImageValid, getCafeData } from "../service/cafeService";

interface CafeContextType {
  state: CafeState;
  dispatch: React.Dispatch<CafeAction>;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);


// Provider Component
export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cafeReducer, initialCafeState);

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        const cafeData = await getCafeData(`${import.meta.env.VITE_APP_CAFE_ID}`);
        dispatch({ type: "FETCH_SUCCESS", payload: cafeData });

        if (cafeData?.image_url) {
          const isValid = await checkImageValid(cafeData.image_url);
          dispatch({ type: "SET_VALID_IMAGE", payload: isValid });
        }
      } catch (error: any) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchCafe();
  }, []);

  return <CafeContext.Provider value={{ state, dispatch }}>{children}</CafeContext.Provider>;
};

// Hook สำหรับใช้ CafeContext
export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) throw new Error("useCafe must be used within a CafeProvider");
  return context;
};
