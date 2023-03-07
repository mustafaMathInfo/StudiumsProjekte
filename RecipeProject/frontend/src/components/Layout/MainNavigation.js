import React, {useState} from 'react';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from '../../store/auth-context';


const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    };


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">STUDENTS KITCHEN</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        {isLoggedIn && <Nav.Link href="/recipe">ALL RECIPE</Nav.Link>}
                        {isLoggedIn && <Nav.Link href="/myRecipe">MY RECIPE</Nav.Link>}
                        {isLoggedIn && <Nav.Link href="/favoriteRecipe">FAVORITE RECIPE</Nav.Link>}
                        {isLoggedIn && <Nav.Link href="/newRecipe">NEW RECIPE</Nav.Link>}

                    </Nav>
                    <Nav>
                        {isLoggedIn && <Nav.Link href="/" onClick={logoutHandler}>LOG OUT</Nav.Link>}
                        {!isLoggedIn && <Nav.Link href="/login">LOG IN</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNavigation;