package com.example.RecipeBackend.services;

import com.example.RecipeBackend.entity.Rating;
import com.example.RecipeBackend.repository.RatingRepository;
import com.example.RecipeBackend.repository.RecipeRepository;
import com.example.RecipeBackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class RatingService{
    private RatingRepository ratingRepository ;
    private RecipeRepository recipeRepository;
    private UserRepository userRepository;

    public RatingService(RatingRepository ratingRepository, RecipeRepository recipeRepository, UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    // register new rating mit userId, recipeId und rating
    // sollte drei Bedingungen überprüfen.
    // 1- sollte nicht schon registrieren, wenn schon registriert, wird nur existed Bewertung ändern.
    // 2- sollte der User und Recipe in Datenbank existieren, um error zu vermeiden, weil ich CascadeType implementiert habe.
    public void addNewRating(Long userId, Long recipeId, Integer rating) {
        Optional<Long> foundedRatingId = ratingRepository.findByUserIdAndRecipeId(userId, recipeId);
        boolean isUserExists = userRepository.existsById(userId);
        boolean isRecipeExists = recipeRepository.existsById(recipeId);
        if (isUserExists && isRecipeExists){
            if (foundedRatingId.isPresent()){
                ratingRepository.deleteById(foundedRatingId.get());
            }
            ratingRepository.save(new Rating(userId, recipeId, rating));
        }
    }
}
