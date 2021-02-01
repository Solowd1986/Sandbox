const initialState = {
    isModalActive: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "modal/disableModal" : {
            return {
                isModalActive: false
            }
        }

        case "modal/enableModal" : {
            return {
                isModalActive: true
            }
        }

        default:
            return state;
    }
}










