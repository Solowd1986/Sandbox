import React from "react";

// add static whyDidYouRender = true to component
if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        // trackAllPureComponents: true,
    });
}


