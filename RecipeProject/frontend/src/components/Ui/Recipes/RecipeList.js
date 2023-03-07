import RecipeForm from "./RecipeForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RecipeFilter from "./RecipeFilter";
import React, {useState} from "react";
import {Pagination} from "@mui/material";

const RecipeList = (props) => {
    const [filteredList, setFilteredList] = useState(null)
    const difficulty = ["all", "simple", "medium", "hard"];
    const category = ["all", "reis", "kuchen", "nudeln", "fleisch", "vegetarisch"]

    return (
        <Container>
            <Row className="mt-2">
                <Col className=" col-2 mt-3">
                    <RecipeFilter diffOrCateList={difficulty}
                                  name="DIFFICULTY"
                                  recipes={props.recipes}
                                  setFilteredList={setFilteredList}
                    />
                    <RecipeFilter diffOrCateList={category}
                                  name="CATEGORY"
                                  recipes={props.recipes}
                                  setFilteredList={setFilteredList}
                    />
                </Col>
                <Col className="col-10">
                    <Row>
                        { (filteredList || props.recipes).map((recipe) => (
                            <RecipeForm
                                key={recipe.id}
                                userId={recipe.userId}
                                id={recipe.id}
                                name={recipe.name}
                                favorites={recipe.favorites}
                                ratings={recipe.ratings}
                                views={recipe.views}
                                description={recipe.description}
                                price={recipe.price}
                                duration={recipe.duration}
                                difficulty={recipe.difficulty}
                                recipePhoto={recipe.recipePhoto}
                                ingredients={recipe.ingredients}
                                preparation={recipe.preparation}
                                category={recipe.category}
                                isAllRecipe={props.isAllRecipe}
                            />
                        ))}
                    </Row>
                    <Row>
                    </Row>
                </Col>
            </Row>
            <Pagination onClick={(e) => props.onPaginationHandler(e.target.innerText)}
                        className="d-flex justify-content-center"
                        count={+props.totalPages}
                        variant="outlined"
                        shape="rounded"/>
        </Container>

    );
};

export default RecipeList;