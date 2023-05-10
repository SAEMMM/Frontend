import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectWhere: 'null',
    starRadio: '',
    keyword: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getWhere: (state, action) => {
            state.selectWhere = action.payload
        },
        getStar: (state, action) => {
            state.starRadio = action.payload
        },
        getKeyword: (state, action) => {
            state.keyword = action.payload
        }
    }
})

export const { getWhere, getStar, getKeyword } = searchSlice.actions;
export default searchSlice.reducer;