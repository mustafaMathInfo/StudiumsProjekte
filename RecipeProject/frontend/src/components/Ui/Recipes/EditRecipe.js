import React, {useContext, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {Button, FloatingLabel, Form, Stack} from "react-bootstrap";
import AuthContext from "../../../store/auth-context";
import {useNavigate} from "react-router-dom";
import RecipeContext from "../../../store/recipe-context";
import {convertBase64} from "./uploadImage";

const EditRecipe = () => {
    let imageBase64;

    const authCtx = useContext(AuthContext);
    const recipeCtx = useContext(RecipeContext);
    const navigate = useNavigate();
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const priceInputRef = useRef();
    const durationInputRef = useRef();
    const difficultyInputRef = useRef();
    const ingredientsInputRef = useRef();
    const preparationInputRef = useRef();
    const categoryInputRef = useRef();

    const onUploadImage = async (e) => {
        const file = e.target.files[0];
        imageBase64 = await convertBase64(file);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const newRecipe = {
            userId: authCtx.userId,
            name: nameInputRef.current.value || recipeCtx.myRecipe.name,
            description: descriptionInputRef.current.value || recipeCtx.myRecipe.description,
            price: priceInputRef.current.value || recipeCtx.myRecipe.price,
            duration: durationInputRef.current.value || recipeCtx.myRecipe.duration,
            difficulty: difficultyInputRef.current.value || recipeCtx.myRecipe.difficulty,
            recipePhoto: imageBase64 || recipeCtx.myRecipe.recipePhoto,
            ingredients: ingredientsInputRef.current.value || recipeCtx.myRecipe.ingredients,
            preparation: preparationInputRef.current.value || recipeCtx.myRecipe.preparation,
            category: categoryInputRef.current.value || recipeCtx.myRecipe.category
        }
        console.log(newRecipe)
        recipeCtx.addOrEditRecipeHandler(`http://localhost:9090/api/recipe?id=${recipeCtx.myRecipe.id}`, newRecipe, 'PUT')
        navigate("/", {replace: true})
    };

    return (
        <Container>
            <h1 className="mt-3">Rezepte Editieren</h1>
            <Col className="col-12">
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name des Rezepts"
                        className="m-3"
                    >
                        <Form.Control type="text" placeholder="" ref={nameInputRef}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Kurz Beschreibung"
                        className="m-3"
                    >
                        <Form.Control type="text" placeholder="" ref={descriptionInputRef}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Preis($)"
                        className="m-3"
                    >
                        <Form.Control type="text" placeholder="" ref={priceInputRef}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Dauer (min)"
                        className="m-3 "
                    >
                        <Form.Control type="text" placeholder="" ref={durationInputRef}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingSelect" label="Schierigkeit" className="m-3">
                        <Form.Select ref={difficultyInputRef}>
                            <option value="simple">Simple</option>
                            <option value="medium">Mittel</option>
                            <option value="hard">Schwer</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingSelect" label="Kategorie" className="m-3">
                        <Form.Select ref={categoryInputRef}>
                            <option value="kuchen">Kuchen</option>
                            <option value="nudeln">Nudeln</option>
                            <option value="reis">Reis</option>
                            <option value="fleisch">Flesich</option>
                            <option value="vegetarisch">Vegetarisch</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Zutaten" className="m-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{height: '100px'}}
                            ref={ingredientsInputRef}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Zubereitung" className="m-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{height: '100px'}}
                            ref={preparationInputRef}
                        />
                    </FloatingLabel>
                    <Form.Group controlId="formFileL" className="m-3">
                        <Form.Control
                            onChange={(e) => {
                                onUploadImage(e);
                            }}
                            type="file" size="lg"/>
                    </Form.Group>
                    <Stack direction="horizontal" gap={2} className="m-3">
                        <Button variant="dark" type="submit" onClick={submitHandler}>
                            Speichern
                        </Button>
                        <Button variant="dark" type="button"
                                className="ms-auto">
                            Abbrechen
                        </Button>
                    </Stack>
                </Form>
            </Col>
        </Container>
    );
};

export default EditRecipe;