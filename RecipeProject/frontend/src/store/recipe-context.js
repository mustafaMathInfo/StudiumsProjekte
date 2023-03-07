import React, {useCallback, useContext, useEffect, useState} from "react";
import {fetchList} from "./fetch/fetchList";
import AuthContext from "./auth-context";
import {fetchHttp} from "./fetch/fetchHttp";

const RecipeContext = React.createContext({
    recipeList: [],
    myRecipeList: [],
    category: [],
    difficulty: [],
    filteredList: [],
    recipeCard: '',
    totalPagesAllRecipe: '',
    totalPagesMyRecipe: '',
    fetchAllRecipeHandler: () => {
    },
    fetchRecipeCard: () => {
    },
    setMyRecipeHandler: (recipe) => {
    },
    addOrEditRecipeHandler: (url, data, method) => {
    },
    deleteRecipeHandler: (userId, recipeId) => {
    },
    paginationAllRecipeHandler: (page) => {
    },
    paginationMyRecipeHandler:(page) => {
    }
})

export const RecipeContextProvider = (props) => {
    const authCtx = useContext(AuthContext);

    const [allRecipeList, setAllRecipeList] = useState([])
    const [myRecipeList, setMyRecipeList] = useState([])
    const [filteredList, setFilteredList] = useState(null)
    const [recipeCard, setRecipeCard] = useState('')
    const [myRecipe, setMyRecipe] = useState('')
    const [totalPagesAllRecipe, setTotalPagesAllRecipe] = useState(1)
    const [totalPagesMyRecipe, setTotalPagesMyRecipe] = useState(1)

    const category = ["all", "reis", "kuchen", "nudeln", "fleisch", "vegetarisch"]
    const difficulty = ["all", "simple", "medium", "hard"];


    const fetchAllRecipeHandler = useCallback(async () => {
        fetchList('http://localhost:9090/api/recipe',
            setAllRecipeList, setTotalPagesAllRecipe)
    }, []);

    const fetchMyRecipeHandler = useCallback(async () => {
        if (authCtx.userId) {
            fetchList(`http://localhost:9090/api/recipe/myRecipe?id=${authCtx.userId}`,
                setMyRecipeList, setTotalPagesMyRecipe)
        }
    }, []);

    useEffect(() => {
        fetchAllRecipeHandler();
        fetchMyRecipeHandler();
    }, [fetchAllRecipeHandler]);

    const paginationAllRecipeHandler = (page) => {
        if (page) {
            fetchList(`http://localhost:9090/api/recipe?page=${page - 1}`,
                setAllRecipeList, setTotalPagesAllRecipe)
        }
    }

    const paginationMyRecipeHandler = (page) => {
        if (page) {
            fetchList(`http://localhost:9090/api/recipe/myRecipe?id=${authCtx.userId}&page=${page - 1}`,
                setMyRecipeList, setTotalPagesMyRecipe)
        }
    }

    const fetchRecipeCard = (recipeCard) => {
        setRecipeCard(recipeCard);
    }

    const setMyRecipeHandler = (recipe) => {
        setMyRecipe(recipe)
    }

    const addOrEditRecipeHandler = (url, data, method) => {
        fetchHttp(url, method, {
            'Content-Type': 'application/json',
        }, data)
        fetchAllRecipeHandler();
    }

    const deleteRecipeHandler = (recipeId) => {
        fetchHttp(`http://localhost:9090/api/recipe?userId=${authCtx.userId}&recipeId=${recipeId}`, 'DELETE')
        console.log("Deleted")
    }

    const contextValue = {
        recipeList: allRecipeList,
        myRecipeList,
        myRecipe,
        recipeCard,
        category,
        difficulty,
        filteredList,
        totalPagesAllRecipe,
        totalPagesMyRecipe,
        fetchAllRecipeHandler,
        fetchRecipeCard,
        setMyRecipeHandler,
        addOrEditRecipeHandler,
        deleteRecipeHandler,
        paginationAllRecipeHandler,
        paginationMyRecipeHandler,
    }

    return (
        <RecipeContext.Provider value={contextValue}>
            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeContext;