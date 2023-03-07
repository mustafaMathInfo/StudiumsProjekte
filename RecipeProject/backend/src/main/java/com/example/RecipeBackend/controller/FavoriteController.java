package com.example.RecipeBackend.controller;

import com.example.RecipeBackend.RecipeResponse;
import com.example.RecipeBackend.entity.Favorite;
import com.example.RecipeBackend.entity.Recipe;
import com.example.RecipeBackend.services.FavoriteService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "api/favorite")
public class FavoriteController {
    private FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    // gibt Favorite Recipe List für bestimmit user Maximal 8 Recipe zurück.
    @GetMapping()
    public ResponseEntity<Page<RecipeResponse>> getMyFavorite(@RequestParam("id") Optional<Long> userId,
                                                      @RequestParam Optional<Integer> page,
                                                      @RequestParam Optional<Integer> size) {
        Page<RecipeResponse> favoriteRecipe = favoriteService.getMyFavorite(
                userId.orElse(0L), page.orElse(0), size.orElse(8));
        return new ResponseEntity<Page<RecipeResponse>>(favoriteRecipe, HttpStatus.OK);
    }

    // gibt all Id von Recipe, die Favorite sind, zurück.
    @GetMapping(path = "allfavorite")
    public ResponseEntity<List<Long>> getAllMyFavorite(@RequestParam("id") Optional<Long> userId) {
        List<Long> favoriteList = favoriteService.getAllMyFavorite(
                userId.orElse(0L));
        return new ResponseEntity<List<Long>>(favoriteList, HttpStatus.OK);
    }

    // register new Favorite mit userId und recipeId
    @PostMapping
    public ResponseEntity<Void> addFavorite(@RequestParam("userId") Optional<Long> userId,
                                            @RequestParam("recipeId") Optional<Long> recipeId) {
        if (userId.isPresent() && recipeId.isPresent()) {
            favoriteService.addFavorite(new Favorite(userId.get(), recipeId.get()));
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // Delete Favorite mit userId und recipeId
    @DeleteMapping()
    public ResponseEntity<Void> deleteFavorite(@RequestParam("userId") Optional<Long> userId,
                                               @RequestParam("recipeId") Optional<Long> recipeId) {
        if (userId.isPresent() && recipeId.isPresent()) {
            favoriteService.deleteFavorite(userId.get(), recipeId.get());
        }

        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
