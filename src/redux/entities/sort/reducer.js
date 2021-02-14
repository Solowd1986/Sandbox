const initialState = {
    sortType: "по популярности"
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "sort/changeSortType": {
            return {
                sortType: action.payload.sortType
            };
        }

        default: {
            return state;
        }
    }
}


