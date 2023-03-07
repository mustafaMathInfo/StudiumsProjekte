import React, {useState} from 'react';
import RecipeCard from "./RecipeCard";
import Col from "react-bootstrap/Col";

const RecipeForm = (props) => {
    return (
        <>
            <Col className="col-3">
                <RecipeCard recipe={props}></RecipeCard>
            </Col>
        </>
    );
};

export default RecipeForm;