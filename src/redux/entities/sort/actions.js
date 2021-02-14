export const changeSortType = (sortType) => {
    return {
        type: "sort/changeSortType",
        payload: {
            sortType
        }
    }
};
