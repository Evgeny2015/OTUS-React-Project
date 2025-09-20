import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BasketProductModel } from "../../entities";
import { type RtkState, tokenActions } from "./";


const basketSlice = createSlice({
    name: 'basket',
    initialState: (): BasketProductModel[] => [],
    reducers: {
        add: (state, action: PayloadAction<BasketProductModel>) => {
            if (state === null) {
                return [action.payload];
            }

            if (state.findIndex(x => x.id === action.payload.id) < 0)
            {
                state.push(action.payload);
            }
        },
        clear: () => [],
        remove: (state, action: PayloadAction<BasketProductModel["id"]>) => {
            const index = state.findIndex(x => x.id === action.payload);
            if( index >= 0) {
                state.splice(index, 1)
            }
        },
        setQuantity: (state, action: PayloadAction<{id: BasketProductModel["id"], quantity: number}>) => {
            const index = state.findIndex(x => x.id === action.payload.id);
            if( index >= 0) {
                state[index].quantity = action.payload.quantity
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(tokenActions.clear, () => {
            return [];
        });
    },
});
export const basketActions = basketSlice.actions;

export const basketSelectors = {
    get: (state: RtkState): RtkState['basket'] => {
        return state.basket;
    },
};
export const basket = basketSlice.reducer;