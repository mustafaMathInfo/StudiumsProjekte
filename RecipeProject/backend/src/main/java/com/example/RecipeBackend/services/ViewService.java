package com.example.RecipeBackend.services;

import com.example.RecipeBackend.entity.Favorite;
import com.example.RecipeBackend.entity.View;
import com.example.RecipeBackend.repository.RecipeRepository;
import com.example.RecipeBackend.repository.UserRepository;
import com.example.RecipeBackend.repository.ViewRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class ViewService{
    private ViewRepository viewRepository;
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;

    public ViewService(ViewRepository viewRepository,
                       RecipeRepository recipeRepository,
                       UserRepository userRepository) {
        this.viewRepository = viewRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    // register new view mit userId, recipeId
    // sollte drei Bedingungen überprüfen.
    // 1- sollte nicht schon registrieren.
    // 2- sollte der User und Recipe in Datenbank existieren, um error zu vermeiden, weil ich CascadeType implementiert habe.
    public void addView(View view) {
        Optional<Long> foundedFavoriteEntity =
                viewRepository.findByUserIdAndRecipeId(view.getUserApp().getId(), view.getRecipe().getId());
        boolean isUserExists = userRepository.existsById(view.getUserApp().getId());
        boolean isRecipeExists = recipeRepository.existsById(view.getRecipe().getId());
        if (foundedFavoriteEntity.isEmpty() && isUserExists && isRecipeExists){
            viewRepository.save(view);
        }
    }
}
