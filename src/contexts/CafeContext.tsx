// contexts/CafeContext.tsx
import { createContext, useContext, useState } from "react";

interface CafeContextType {
  cafeData: any;
  setCafeData: (cafeData: any) => void;
  products: any;
  setProducts: (products: any) => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

// Provider Component
export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cafeData, setCafeData] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <CafeContext.Provider
      value={{
        cafeData,
        setCafeData,
        products,
        setProducts,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

// Hook สำหรับใช้ CafeContext
export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) throw new Error("useCafe must be used within a CafeProvider");
  return context;
};
