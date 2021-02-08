import db from "./mock-data/database"


// const initialState = {
//     indexPageProducts: [
//         {id: 1},
//         {id: 2},
//     ],
//     mock,
//
//     categoryPageProducts: [],
// };

export default (state = db, action) => {
    switch (action.type) {
        case "server/getIndexData": {
            //console.log("request proccess");
            return {
                ...state,
                index: action.payload
            };
        }

        case "server/startRequest": {
            //console.log("start request");
            break;
        }
        case "server/serverError": {
            //console.log("error when request " + action.payload.message);
            break;
        }
    }

    return state
}
