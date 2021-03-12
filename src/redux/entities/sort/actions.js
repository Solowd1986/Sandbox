import * as types from "./constants/sort";

export const changeSortType = (sortType) => {
    return {
        type: types.SORT_CHANGE_SORT_TYPE,
        payload: {
            sortType
        }
    }
};
