package com.example.RecipeBackend.services;

import com.example.RecipeBackend.RecipeResponse;
import com.example.RecipeBackend.entity.Recipe;
import com.example.RecipeBackend.entity.UserApp;
import com.example.RecipeBackend.repository.*;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ProductService {
    FavoriteRepository favoriteRepository;
    RatingRepository ratingRepository;
    ViewRepository viewRepository;

    public ProductService(FavoriteRepository favoriteRepository, RatingRepository ratingRepository, ViewRepository viewRepository) {
        this.favoriteRepository = favoriteRepository;
        this.ratingRepository = ratingRepository;
        this.viewRepository = viewRepository;
    }

    public List<Long> getListId(UserRepository userRepository, Long userId) {
        List<Long> listId = new ArrayList<>();
        boolean existsById = userRepository.existsById(userId);
        if (existsById) {
            listId = userRepository.findById(userId)
                    .get()
                    .getFavorites()
                    .stream()
                    .map(favorite -> favorite.getRecipe().getId())
                    .toList();
        }
        return listId;
    }

    public Page<RecipeResponse> pageable(List<Recipe> recipes, int page, int size) {

        List<RecipeResponse> recipeResponses = new ArrayList<>();
        recipes.stream().forEach(recipe -> {
            RecipeResponse recipeResponse = new RecipeResponse();
            int views = viewRepository.findViewNumberByRecipeId(recipe.getId());
            int favorites = favoriteRepository.findFavoriteNumberByRecipeId(recipe.getId());
            Double ratings = ratingRepository.findRatingByRecipeId(recipe.getId()).orElse(0.0);
            recipeResponse.setId(recipe.getId());
            recipeResponse.setUserId(recipe.getUserApp().getId());
            recipeResponse.setName(recipe.getName());
            recipeResponse.setFavorites(favorites);
            recipeResponse.setRatings(ratings);
            recipeResponse.setViews(views);
            recipeResponse.setDescription(recipe.getDescription());
            recipeResponse.setPrice(recipe.getPrice());
            recipeResponse.setDuration(recipe.getDuration());
            recipeResponse.setRecipePhoto(recipeResponse.getRecipePhoto());
            recipeResponse.setDifficulty(recipe.getDifficulty());
            recipeResponse.setRecipePhoto(recipe.getRecipePhoto());
            recipeResponse.setIngredients(recipe.getIngredients());
            recipeResponse.setPreparation(recipe.getPreparation());
            recipeResponse.setCategory(recipe.getCategory());
            recipeResponses.add(recipeResponse);
        });

        PageRequest pageable = PageRequest.of(page, size);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), recipes.size());
        if (start > recipes.size())
            return new PageImpl<>(new ArrayList<RecipeResponse>(), pageable, recipes.size());
        return new PageImpl<>(recipeResponses.subList(start, end), pageable, recipes.size());
    }

}
