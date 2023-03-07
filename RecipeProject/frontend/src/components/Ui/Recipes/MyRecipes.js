import React, {useContext} from 'react';
import RecipeList from "./RecipeList";
import RecipeContext from "../../../store/recipe-context";


const MyRecipes = () => {

    const recipeCtx = useContext(RecipeContext);

    return (
        <>
            <section>
                <RecipeList
                    recipes={recipeCtx.myRecipeList}
                    isMyRecipe={true}
                    onPaginationHandler={recipeCtx.paginationMyRecipeHandler}
                    totalPages={recipeCtx.totalPagesMyRecipe}
                /></section>
        </>
    );
};

export default MyRecipes;