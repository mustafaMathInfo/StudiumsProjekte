import React, {useContext, useRef, useState} from 'react';
import {Button, FloatingLabel, Form, Stack} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import AuthContext from "../../../store/auth-context";
import {useNavigate} from "react-router-dom";
import RecipeContext from "../../../store/recipe-context";
import {convertBase64} from "./uploadImage";

const AddRecipe = () => {
    let imageBase64;

    const recipeCtx = useContext(RecipeContext);
    const authCtx = useContext(AuthContext);
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
            userId:authCtx.userId,
            name: nameInputRef.current.value ? nameInputRef.current.value : alert("Recipe-Name is Empty"),
            description: descriptionInputRef.current.value? descriptionInputRef.current.value : alert("Beschreibung is Empty"),
            duration: durationInputRef.current.value? durationInputRef.current.value : alert("Dauer is Empty"),
            recipePhoto: imageBase64? imageBase64:alert("Image is Empty"),
            difficulty: difficultyInputRef.current.value,
            price: priceInputRef.current.value? priceInputRef.current.value : alert("Price is Empty"),
            ingredients: ingredientsInputRef.current.value? ingredientsInputRef.current.value : alert("Zutaten is Empty"),
            preparation: preparationInputRef.current.value? preparationInputRef.current.value: alert("Zubereitung is Empty"),
            category: categoryInputRef.current.value
        }
        recipeCtx.addOrEditRecipeHandler('http://localhost:9090/api/recipe', newRecipe, 'POST');
        navigate("/", {replace: true})
    };

    return (
        <Container>
            <h1 className="mt-3">Neues Rezepte</h1>
            <Col className="col-12">
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name des Rezepts"
                        className="m-3"
                    >
                        <Form.Control type="text" placeholder="" ref={nameInputRef} required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Kurz Beschreibung"
                        className="m-3"
                    >
                        <Form.Control type="text" placeholder="" ref={descriptionInputRef} required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Preis($)"
                        className="m-3"
                    >
                        <Form.Control type="text" placeholder="" ref={priceInputRef} required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Dauer (min)"
                        className="m-3 "
                    >
                        <Form.Control type="text" placeholder="" ref={durationInputRef} required/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingSelect" label="Schwierigkeit" className="m-3">
                        <Form.Select ref={difficultyInputRef} aria-label="Floating label select example">
                            <option value="simple">Simple</option>
                            <option value="medium">Mittel</option>
                            <option value="hard">Schwer</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingSelect" label="Kategorie" className="m-3">
                        <Form.Select ref={categoryInputRef} aria-label="Floating label select example">
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
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Zubereitung" className="m-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{height: '100px'}}
                            ref={preparationInputRef}
                            required
                        />
                    </FloatingLabel>
                    <Form.Group controlId="formFileL" className="m-3">
                        <Form.Control onChange={(e) => {
                            onUploadImage(e);
                        }} type="file" size="lg"/>
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

export default AddRecipe;