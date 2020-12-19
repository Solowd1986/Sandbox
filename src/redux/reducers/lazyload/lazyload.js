const initialState = {
    serverStorageData: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case "lazyLoad/setServerData" : {
            return {
                ...state,
                serverStorageData: action.data
            }
        }

        default:
            return state;
    }
}




