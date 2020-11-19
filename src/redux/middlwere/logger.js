const logger = store => next => action => {
    const result = next(action);
    //console.log(next);
    //console.log(action);
    //console.log('middle', store.getState());
    return result
};

export default logger;



