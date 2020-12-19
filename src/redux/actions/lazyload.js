export const setServerData = (data) => {
    return {
        type: "lazyLoad/setServerData",
        data
    }
};

export const clearDataStorage = () => {
    return {
        type: "lazyLoad/clearDataStorage",
    }
};
