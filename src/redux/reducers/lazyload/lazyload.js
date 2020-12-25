const initialState = {
    modalShow: false,
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

        case "lazyLoad/clearDataStorage" : {
            //console.log('clear');
            return {
                ...state,
                serverStorageData: [],
                categoryTitle: "",
                indexOfLastAddedElement: 0
            }
        }

        default:
            return state;
    }
}




