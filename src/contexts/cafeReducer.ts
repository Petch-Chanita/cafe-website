// contexts/Reducer.ts
export interface CafeState {
    cafeData: any;
    loading: boolean;
    error: string | null;
    validImage: boolean;
  }
  
  export const initialCafeState: CafeState = {
    cafeData: null,
    loading: true,
    error: null,
    validImage: false,
  };
  
    
  export type CafeAction =
      | { type: "FETCH_SUCCESS"; payload: any }
      | { type: "FETCH_ERROR"; payload: string }
      | { type: "SET_VALID_IMAGE"; payload: boolean };
      
  
  export const cafeReducer = (state: CafeState, action: CafeAction): CafeState => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return { ...state, cafeData: action.payload, loading: false };
      case "FETCH_ERROR":
        return { ...state, error: action.payload, loading: false };
      case "SET_VALID_IMAGE":
        return { ...state, validImage: action.payload };
      default:
        return state;
    }
  };


  