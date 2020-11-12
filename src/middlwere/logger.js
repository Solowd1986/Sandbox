const loggerMiddleware = store => next => action => {
    const result = next(action);
    console.log('middle', store);
    return result
};

export default loggerMiddleware;



