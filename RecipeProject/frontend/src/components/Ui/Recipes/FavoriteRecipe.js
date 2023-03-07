import React, {useContext} from 'react';
import RecipeList from "./RecipeList";
import FavoriteContext from "../../../store/favorite-context";

const FavoriteRecipe = () => {
    const favoriteRecipeCtx = useContext(FavoriteContext)
    return (
        <RecipeList
            recipes={favoriteRecipeCtx.favoriteList}
            onPaginationHandler={favoriteRecipeCtx.paginationMyFavoriteHandler}
            totalPages={favoriteRecipeCtx.totalPagesMyFavorite}
        />
    );
};

export default FavoriteRecipe;