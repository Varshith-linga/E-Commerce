import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (Yet Another Redux Counter)'
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.data += action.payload;
        },
        decrement: (state, action: PayloadAction<number>) => {
            state.data -= action.payload;
        }
    }
});

// Export actions and reducer
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
