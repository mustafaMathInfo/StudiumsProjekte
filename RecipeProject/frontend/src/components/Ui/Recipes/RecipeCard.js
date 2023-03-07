import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import Visibility from '@mui/icons-material/Visibility';
import Rating from '@mui/material/Rating';
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import RecipeContext from "../../../store/recipe-context";
import FavoriteContext from "../../../store/favorite-context";
import RatingContext from "../../../store/rating-context";
import ViewContext from "../../../store/view-context";

const RecipeCard = (props) => {
    const recipe = props.recipe;
    const navigate = useNavigate();
    const viewCtx = useContext(ViewContext);
    const recipeCtx = useContext(RecipeContext);

    const onRecipeDetailedHandler = () => {
        recipeCtx.fetchRecipeCard(recipe)
        viewCtx.addViewHandler(recipe.id)
        navigate("/recipeDetailed", {replace: true})
    }

    return (
        <Card onClick={onRecipeDetailedHandler}
              className="mt-3"
              sx={{
                  bgcolor: 'initial',
                  boxShadow: 'none',
                  '--Card-padding': '0px',
              }}
        >
            <Box sx={{display: 'flex'}}>
                <h5 className="ms-1">
                    {recipe.name}
                </h5>
            </Box>
            <Box sx={{position: 'relative'}}>
                <AspectRatio ratio="4/3">
                    <figure>
                        <img src={recipe.recipePhoto}/>
                    </figure>
                </AspectRatio>
                <CardCover
                    className="gradient-cover"
                    sx={{
                        '&:hover, &:focus-within': {
                            opacity: 1,
                        },
                        opacity: 0,
                        transition: '0.1s ease-in',
                        background:
                            'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                    }}
                >


                </CardCover>
            </Box>
            <Box sx={{display: 'flex', gap: 1, mt: 1.5, alignItems: 'center'}}>
                <Rating name="read-only" value={recipe.ratings} readOnly/>
                <Link
                    href="#dribbble-shot"
                    level="body3"
                    underline="none"
                    startDecorator={<Favorite/>}
                    sx={{
                        fontWeight: 'md',
                        ml: 'auto',
                        color: 'text.secondary',
                        '&:hover': {color: 'danger.plainColor'},
                    }}
                >
                    {recipe.favorites}
                </Link>
                <Link
                    href="#dribbble-shot"
                    level="body3"
                    underline="none"
                    startDecorator={<Visibility/>}
                    sx={{
                        fontWeight: 'md',
                        color: 'text.secondary',
                        '&:hover': {color: 'primary.plainColor'},
                    }}
                >
                    {recipe.views}
                </Link>
            </Box>
        </Card>

    );
};

export default RecipeCard;