import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sign: "",
    num: 0,
    res: 0
};

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setSign: (state, action) => {
            state.sign = action.payload;
        },
        setNum: (state, action) => {
            state.num = action.payload;
        },
        setRes: (state, action) => {
            state.res = action.payload;
        }, 
        reset: (state, action) => {
            state.sign = "";
            state.num = 0;
            state.res = 0;
        }
    }
});

// actions 
export const { setSign, setNum, setRes, reset } = calculatorSlice.actions;

// selectors
export const selectSign = state => state.calculator.sign;
export const selectNum = state => state.calculator.num;
export const selectRes = state => state.calculator.res;

// reducer default export
export default calculatorSlice.reducer;
