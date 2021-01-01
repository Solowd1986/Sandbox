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

export const disableOverlay = (callback) => {
    return {
        type: "lazyLoad/disableOverlay",
    }
};


export const enableOverlay = () => {
    return {
        type: "lazyLoad/enableOverlay",
    }
};
