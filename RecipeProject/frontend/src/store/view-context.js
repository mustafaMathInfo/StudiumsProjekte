import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "./auth-context";
import {fetchHttp} from "./fetch/fetchHttp";

const ViewContext = React.createContext({
    addViewHandler: (recipeId) => {
    },
})

export const ViewContextProvider = (props) => {
    const authCtx = useContext(AuthContext);

    const addViewHandler = (recipeId) => {
        fetchHttp(`http://localhost:9090/api/view?userId=${authCtx.userId}&recipeId=${recipeId}`, 'POST')
    }

    const contextValue = {
        addViewHandler,
    }

    return (
        <ViewContext.Provider value={contextValue}>
            {props.children}
        </ViewContext.Provider>
    )
}
export default ViewContext;