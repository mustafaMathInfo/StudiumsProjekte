package com.example.RecipeBackend.controller;

import com.example.RecipeBackend.RecipeCredential;
import com.example.RecipeBackend.RecipeResponse;
import com.example.RecipeBackend.entity.Recipe;
import com.example.RecipeBackend.services.RecipeService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "api/recipe")
public class RecipeController {
    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // gibt Recipe List Maximal 8 Recipe zurück.
    @GetMapping
    public ResponseEntity<Page<RecipeResponse>> getRecipes(@RequestParam Optional<Integer> page,
                                                   @RequestParam Optional<Integer> size) {
        Page<RecipeResponse> recipes = recipeService.getRecipes(page.orElse(0), size.orElse(8));
        return new ResponseEntity<Page<RecipeResponse>>(recipes, HttpStatus.OK);
    }

    // gibt Favorite Recipe List für betimes user maximal 8 Recipe zurück.
    @GetMapping(path = "myRecipe")
    public ResponseEntity<Page<RecipeResponse>> getMyRecipes(@RequestParam("id") Optional<Long> userId,
                                                     @RequestParam Optional<Integer> page,
                                                     @RequestParam Optional<Integer> size) {
        Page<RecipeResponse> myRecipes = recipeService.getMyRecipes(
                userId.orElse(0L), page.orElse(0), size.orElse(8));
        return new ResponseEntity<Page<RecipeResponse>>(myRecipes, HttpStatus.OK);
    }

    // register new Recipe
    @PostMapping
    public ResponseEntity<Void> registerNewRecipe(@Valid @RequestBody Optional<RecipeCredential> recipeCredential) {
        if (recipeCredential.isPresent()) {
            Recipe recipe = new Recipe(recipeCredential.get());
            recipeService.addNewRecipe(recipe);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // edit bestimmte Recipe
    @PutMapping
    public ResponseEntity<Void> updateRecipe(@RequestParam("id") Optional<Long> recipeId,
                                             @Valid @RequestBody Optional<RecipeCredential> recipeCredential) {
        if (recipeId.isPresent() && recipeCredential.isPresent()) {
            Recipe recipe = new Recipe(recipeId.get(), recipeCredential.get());
            recipeService.updateRecipe(recipe);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // delete bestimmt Recipe
    @DeleteMapping
    public ResponseEntity<Void> deleteRecipe(@RequestParam("userId") Optional<Long> userId,
                                             @RequestParam("recipeId") Optional<Long> recipeId) {
        if (userId.isPresent() && recipeId.isPresent()) {
            recipeService.deleteRecipe(userId.get(), recipeId.get());
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
