import React from "react";
import Logger from "~functions/Logger";

export default ({ isLoading, pastDelay, error }) => {
    if (isLoading && pastDelay) {
        // during loading but delay has been passed
        return null;
    } else if (error && !isLoading) {
        // failed to load the component
        console.error(error);
        Logger.error("Failed to load");
        throw error;
    } else {
        // during loading
        return <div key="loading-component" />;
    }
};