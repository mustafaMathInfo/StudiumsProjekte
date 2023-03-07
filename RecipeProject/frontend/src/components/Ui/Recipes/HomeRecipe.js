import RecipeList from "./RecipeList";

import {useContext} from "react";
import RecipeContext from "../../../store/recipe-context";

const HomeRecipe = () => {
    const recipeCtx = useContext(RecipeContext);

    return (
        <>
            <section>
                <RecipeList
                    recipes={recipeCtx.recipeList }
                    onPaginationHandler={recipeCtx.paginationAllRecipeHandler}
                    totalPages={recipeCtx.totalPagesAllRecipe}
                />
            </section>
        </>
    );
};

export default HomeRecipe;