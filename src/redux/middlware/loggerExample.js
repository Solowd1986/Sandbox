const loggerExample = store => next => action => {

    //console.log(next);
    //console.log(action);
    //console.log('middle', store.getState());

    if (action.type === "1") {
        //store = {}
    }
    return next(action);
};

export default loggerExample;



