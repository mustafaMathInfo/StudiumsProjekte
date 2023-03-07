import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "./auth-context";
import {fetchList} from "./fetch/fetchList";
import {fetchHttp} from "./fetch/fetchHttp";

const FavoriteContext = React.createContext({
    favoriteList: [],
    totalPagesMyFavorite: '',
    isFavoriteHandler: (recipeId) => {
    },
    addFavoriteHandler: (recipeId) => {
    },
    deleteFavoriteHandler: (recipeId) => {
    },
    paginationMyFavoriteHandler: (page) => {
    }
})

export const FavoriteContextProvider = (props) => {
    const authCtx = useContext(AuthContext);
    const [myFavoriteList, setMyFavoriteList] = useState([])
    const [myAllFavoriteList, setMyAllFavoriteList] = useState({})
    const [totalPagesMyFavorite, setTotalPagesMyFavorite] = useState(1)

    const fetchFavoriteHandler = useCallback(async () => {
        if (!!authCtx.userId) {
            fetchList(`http://localhost:9090/api/favorite/allfavorite?id=${authCtx.userId}`,
                setMyAllFavoriteList);
        }
    }, []);

    const fetchMyFavoriteHandler = useCallback(async () => {
        if (!!authCtx.userId) {
            fetchList(`http://localhost:9090/api/favorite?id=${authCtx.userId}`,
                setMyFavoriteList,
                setTotalPagesMyFavorite)
        }
    }, []);

    useEffect(() => {
        fetchFavoriteHandler();
        fetchMyFavoriteHandler()
    }, [fetchMyFavoriteHandler]);

    const paginationMyFavoriteHandler = (page) => {
        if (page) {
            fetchList(`http://localhost:9090/api/favorite?id=${authCtx.userId}&page=${page - 1}`,
                setMyFavoriteList, setTotalPagesMyFavorite)
        }
    }

    const addFavoriteHandler = (recipeId) => {
        fetchHttp(`http://localhost:9090/api/favorite?userId=${authCtx.userId}&recipeId=${recipeId}`, 'POST');
    }

    const deleteFavoriteHandler = (recipeId) => {
        fetchHttp(`http://localhost:9090/api/favorite?userId=${authCtx.userId}&recipeId=${recipeId}`, 'DELETE');
    }

    const isFavoriteHandler = (recipeId) => {
        return myAllFavoriteList.find((id) => {
            return !!(id == recipeId)
        })
    }

    const contextValue = {
        favoriteList: myFavoriteList,
        totalPagesMyFavorite,
        paginationMyFavoriteHandler,
        isFavoriteHandler,
        addFavoriteHandler,
        deleteFavoriteHandler
    }

    return (
        <FavoriteContext.Provider value={contextValue}>
            {props.children}
        </FavoriteContext.Provider>
    )
}


export default FavoriteContext;