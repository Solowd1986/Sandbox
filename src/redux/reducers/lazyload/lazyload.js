const initialState = {
    numberOfRequestedElements: 4,
    serverStorageData: [],
    categoryTitle: "",
    indexOfLastAddedElement: 0
};


export default (state = initialState, action) => {
    switch (action.type) {
        case "lazyLoad/setServerData" : {
            return {
                ...state,
                categoryTitle: action.data.cat,
                indexOfLastAddedElement: action.data.lastIndex,
                serverStorageData: [...state.serverStorageData, ...action.data.arrayOfElements],
            }
        }


        default:
            return state;
    }
}




