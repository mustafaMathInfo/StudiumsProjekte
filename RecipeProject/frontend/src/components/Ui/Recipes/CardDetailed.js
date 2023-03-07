import * as React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import AspectRatio from "@mui/joy/AspectRatio";
import Rating from "@mui/material/Rating";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";
import {Typography} from "@mui/material";
import {CardOverflow, Divider, Stack} from "@mui/joy";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from "@mui/material/Button";
import EuroIcon from '@mui/icons-material/Euro';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext, useState} from "react";
import RecipeContext from "../../../store/recipe-context";
import AuthContext from "../../../store/auth-context";
import {useNavigate} from "react-router-dom";
import FavoriteContext from "../../../store/favorite-context";
import RatingContext from "../../../store/rating-context";
import ViewContext from "../../../store/view-context";

const CardDetailed = () => {
    const favoriteRecipeCtx = useContext(FavoriteContext)
    const recipeCtx = useContext(RecipeContext);
    const ratingCtx = useContext(RatingContext);
    const authCtx = useContext(AuthContext);

    const recipe = recipeCtx.recipeCard;
    const navigate = useNavigate();

    const isMyRecipe = authCtx.userId == recipe.userId
    const isFavoriteHandler = favoriteRecipeCtx.isFavoriteHandler(recipe.id);


    const [value, setValue] = useState(recipe.ratings);
    const [isFavorite, setIsFavorite] = useState(isFavoriteHandler);
    const [currentFavoriteNumber, setCurrentFavoriteNumber] = useState(recipe.favorites);

    const onToggleFavoriteIconColor = () => {
        if (isFavorite) {
            favoriteRecipeCtx.deleteFavoriteHandler(recipe.id);
            setCurrentFavoriteNumber((prev) => prev - 1);
        } else {
            favoriteRecipeCtx.addFavoriteHandler(recipe.id)
            setCurrentFavoriteNumber((prev) => prev + 1);
        }
        setIsFavorite(!isFavorite);
    }

    const onDeleteRecipeHandler = () => {
        recipeCtx.deleteRecipeHandler(recipe.id)
        navigate("/", {replace: true})
    }

    const onEditRecipeHandler = () => {
        recipeCtx.setMyRecipeHandler(recipe)
        navigate("/myRecipe/edit", {replace: true})
    }

    const onRatingHandler = () => {
        ratingCtx.addRatingHandler(recipe.id, value)
    }

    return (
        <Container className="mt-5">
            <Card variant="outlined"
                  className="mt-2"
            >
                <Row>
                    <Col>
                        <CardOverflow>
                            <AspectRatio objectFit="cover" minHeight={600}>
                                <img src={recipe.recipePhoto}/>
                            </AspectRatio>
                        </CardOverflow>
                    </Col>
                    <Col>
                        <Stack direction="column"
                               justifyContent="space-between"
                               alignItems="flex-start"
                               spacing={5}>
                            <Button variant="primary"
                                    onClick={onToggleFavoriteIconColor}
                                    sx={{marginY: 3}}>
                                {isFavorite && <FavoriteIcon fontSize="large"/>}
                                {!isFavorite && <FavoriteIcon fontSize="large" color="disabled"/>}
                            </Button>
                            <Typography variant="h5" sx={{fontWeight: '500'}}>
                                {recipe.name}
                            </Typography>
                            <Stack direction="row" spacing={12} alignItems="flex-end">
                                <Typography variant="h5" sx={{fontWeight: '500'}}>
                                    {recipe.price} <EuroIcon/>
                                </Typography>

                                <Typography variant="h5" sx={{fontWeight: '500'}}>
                                    {recipe.duration} min <AccessTimeFilledIcon/>
                                </Typography>
                                <Typography variant="h5" sx={{fontWeight: '500'}}>
                                    {recipe.difficulty}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h5" sx={{fontWeight: '500', mt: 3}}>
                                    Zutaten
                                </Typography>
                                <Typography variant="subtitle1" sx={{fontWeight: '500'}}>
                                    {recipe.ingredients}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h5" sx={{fontWeight: '500', mt: 3}}>
                                    Zubereitung
                                </Typography>
                                <Typography variant="subtitle1" sx={{fontWeight: '500'}}>
                                    {recipe.preparation}
                                </Typography>
                            </Stack>
                            <Divider/>
                            <Stack direction="row"
                                   justifyContent="space-between"
                                   alignItems="flex-start"
                                   spacing={15}
                            >
                                {!isMyRecipe && <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />}
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
                                    {currentFavoriteNumber}
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
                            </Stack>
                        </Stack>
                    </Col>
                </Row>
            </Card>
            <Stack spacing={2}
                   direction="row"
                   sx={{mt: 2}}
            >
                {isMyRecipe && <Button onClick={onEditRecipeHandler}
                                       variant="outlined">Edit
                </Button>}
                {isMyRecipe && <Button onClick={onDeleteRecipeHandler}
                                       variant="outlined"
                                       startIcon={<DeleteIcon/>}>Delete
                </Button>}
                {!isMyRecipe && <Button onClick={onRatingHandler}
                                        variant="outlined">Add Rating
                </Button>}
            </Stack>
        </Container>
    )
        ;
};

export default CardDetailed;