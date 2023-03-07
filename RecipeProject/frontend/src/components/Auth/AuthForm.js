import {useState, useRef, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import {Button, Form, Stack} from "react-bootstrap";

const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const switchAuthModeHandler = () => {
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        let url;
        if (isLogin) {
            url = 'http://localhost:9090/api/auth/login'
        } else {
            url = 'http://localhost:9090/api/auth/signup'
        }
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setIsLoading(false);
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage =
                  "Password muss mindestens 8 Buchstaben sein";
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            if (data.email === "Email Exists") {
              alert("Email Exists");
            } else if (data.email === "Register Succeeded") {
              switchAuthModeHandler();
            } else if (data.email === "Email Or Password Not Correct") {
              alert("Email Or Password Not Correct");
            } else {
              authCtx.setUserId(data.id);
              authCtx.login(data.email);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            alert(err.message);
          });
    };
    return (
        <>
            <Container>
                <Row>
                    <Col className="">
                        <img className={classes.images} src={require('../../images/login.jpg')}/>
                    </Col>
                    <Col>
                        <h1 className="mt-5 pt-5">{isLogin ? 'Login' : 'Sign Up'}</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef}
                                              id="email"/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" id="password"
                                              required
                                              ref={passwordInputRef}/>
                            </Form.Group>
                            <Stack direction="horizontal" gap={2}>
                                {!isLoading && (
                                    <Button variant="dark" type="submit">
                                        {isLogin ? 'Login' : 'Create Account'}
                                    </Button>
                                )}
                                {isLoading && <p>Sending request...</p>}
                                <Button onClick={switchAuthModeHandler} variant="dark" type="button"
                                        className="ms-auto">
                                    {isLogin ? 'Create new account' : 'Login with existing account'}
                                </Button>
                            </Stack>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AuthForm;
