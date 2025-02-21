  export type AboutAction =
    | { type: "FETCH_SUCCESS"; payload: any }
    | { type: "FETCH_ERROR"; payload: string }
    | { type: "SET_VALID_IMAGE"; payload: boolean }


    export interface AboutState {
      aboutData: any;
      loading: boolean;
      error: string | null;
      validImage: boolean;
    }
    
    export const initialAboutState: AboutState = {
      aboutData: null,
      loading: true,
      error: null,
      validImage: false,
    };

export const aboutReducer = (state: AboutState, action: AboutAction): AboutState => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return { ...state, aboutData: action.payload, loading: false };
      case "FETCH_ERROR":
        return { ...state, error: action.payload, loading: false };
        case "SET_VALID_IMAGE":
        return { ...state, validImage: action.payload };

      default:
        return state;
    }
  };