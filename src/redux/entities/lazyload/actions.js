export const setServerData = (data) => {
    return {
        type: "lazyLoad/setServerData",
        payload: {
            data
        }
    }
};

export const clearDataStorage = () => {
    return {
        type: "lazyLoad/clearDataStorage",
    }
};


