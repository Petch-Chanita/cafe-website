// src/redux/reducers/productReducer.js

export type ProductAction =
    | { type: "FETCH_PRODUCTS_REQUEST" }
    | { type: "FETCH_PRODUCTS_SUCCESS"; payload: any[] }
    | { type: "FETCH_PRODUCTS_FAILURE"; payload: string }

export interface ProductState {
    products: any[];
    loading: boolean;
    error: string | null;
}


export const initialProductState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

export const productReducer = (state: ProductState = initialProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case "FETCH_PRODUCTS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "FETCH_PRODUCTS_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case "FETCH_PRODUCTS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

