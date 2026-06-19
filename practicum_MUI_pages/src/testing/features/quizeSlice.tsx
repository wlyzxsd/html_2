import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListsState {
    lists: string[][];
    showResults: boolean;
}

const initialState: ListsState = {
    lists: [],
    showResults: false,
};

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<{index: number; items: string[]}>) => {
            const {index, items} = action.payload;
            state.lists.splice(index, 0, items);
        },
        setDraggedItems: (state, action: PayloadAction<{index: number; items: string[]}>) => {
            const {index, items} = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = items;
            }
        },
        resetList: (state, action: PayloadAction<{index: number; items: string[]}>) => {
            const {index, items} = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = items;
            }
        },
        setShowResults: (state, action: PayloadAction<boolean>) => {
            state.showResults = action.payload;
        },
    },
});

export const {addList, setDraggedItems, resetList, setShowResults} = listsSlice.actions;
export default listsSlice.reducer;