package com.example.RecipeBackend.controller;

import com.example.RecipeBackend.entity.Rating;
import com.example.RecipeBackend.services.RatingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "api/rating")
public class RatingController {
    private RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<Void> registerNewRating(@RequestParam("userId") Optional<Long> userId,
                                                  @RequestParam("recipeId") Optional<Long> recipeId,
                                                  @RequestParam("rating") Optional<Integer> rating) {
        if (userId.isPresent() && recipeId.isPresent() && rating.isPresent()) {
            ratingService.addNewRating(userId.get(), recipeId.get(), rating.get());
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
