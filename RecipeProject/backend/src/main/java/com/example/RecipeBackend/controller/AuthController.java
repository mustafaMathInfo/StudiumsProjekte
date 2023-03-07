package com.example.RecipeBackend.controller;

import com.example.RecipeBackend.AccountCredentials;
import com.example.RecipeBackend.entity.UserApp;
import com.example.RecipeBackend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping(path = "api/auth")
public class AuthController {
    public UserService userService;


    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Register User mit E-Mail und Password
    @PostMapping(path = "signup")
    public ResponseEntity<AccountCredentials> register(@Valid @RequestBody AccountCredentials user) {
        AccountCredentials savedUser = userService.register(user);
        return new ResponseEntity<AccountCredentials>(savedUser, HttpStatus.CREATED);
    }

    // Login mit Email und Password
    @PostMapping(path = "login")
    public ResponseEntity<AccountCredentials> login(@Valid @RequestBody AccountCredentials user) {
        AccountCredentials loggedUser = userService.login(user);
        return new ResponseEntity<AccountCredentials>(loggedUser, HttpStatus.OK);
    }
}
