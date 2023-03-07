import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "./auth-context";
import {fetchHttp} from "./fetch/fetchHttp";

const RatingContext = React.createContext({
    addRatingHandler: (recipeId, rating) => {
    },
})

export const RatingContextProvider = (props) => {
    const authCtx = useContext(AuthContext);

    const addRatingHandler = (recipeId, rating) => {
        fetchHttp(`http://localhost:9090/api/rating?userId=${authCtx.userId}&recipeId=${recipeId}&rating=${rating}`, 'POST')
    }

    const contextValue = {
        addRatingHandler,
    }

    return (
        <RatingContext.Provider value={contextValue}>
            {props.children}
        </RatingContext.Provider>
    )
}
export default RatingContext;