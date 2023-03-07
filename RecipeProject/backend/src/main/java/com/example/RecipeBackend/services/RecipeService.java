package com.example.RecipeBackend.services;

import com.example.RecipeBackend.RecipeResponse;
import com.example.RecipeBackend.entity.Recipe;
import com.example.RecipeBackend.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecipeService extends ProductService{
    private RecipeRepository recipeRepository;
    private UserRepository userRepository;
    private FavoriteRepository favoriteRepository;
    private RatingRepository ratingRepository;
    private ViewRepository viewRepository;

    public RecipeService(RecipeRepository recipeRepository, UserRepository userRepository, FavoriteRepository favoriteRepository,
                         RatingRepository ratingRepository, ViewRepository viewRepository) {
        super(favoriteRepository, ratingRepository, viewRepository);
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }


    public Page<RecipeResponse> getRecipes(int page, int size) {
        return pageable(recipeRepository.findAll(), page, size);
    }

    public Page<RecipeResponse> getMyRecipes(Long userId, int page, int size) {
        return pageable(userRepository.findById(userId).get().getRecipes(), page, size);
    }

    public void addNewRecipe(Recipe recipe) {
        boolean isUserExists = userRepository.existsById(recipe.getUserApp().getId());
        if (isUserExists) {
            recipeRepository.save(recipe);
        }
    }

    public void updateRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long userId, Long recipeId) {
        Optional<Recipe> recipeEntity = recipeRepository.findById(recipeId);
        if (recipeEntity.isPresent()
                && recipeEntity.get().getUserApp().getId() == userId) {
            recipeRepository.deleteById(recipeId);
        }
    }

}
