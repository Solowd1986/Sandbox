const loggerExample = store => next => action => {

    console.log(next);
    //console.log(action);
    //console.log('middle', store.getState());

    return next(action);
};

export default loggerExample;



