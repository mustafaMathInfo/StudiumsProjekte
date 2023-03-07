import React from 'react';
import Row from "react-bootstrap/Row";

const RecipeFormDetailed = (props) => {
    return (
        <Row className="bg-black bg-opacity-75 text-white  p-3">
            <h3>Zutaten</h3>
            <p>{props.ingredients}</p>
            <h3>Zuberietung</h3>
            <p>{props.preparation}</p>
        </Row>
    );
};

export default RecipeFormDetailed;