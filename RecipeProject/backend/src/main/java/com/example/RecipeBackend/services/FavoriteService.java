package com.example.RecipeBackend.services;

import com.example.RecipeBackend.RecipeResponse;
import com.example.RecipeBackend.entity.Favorite;
import com.example.RecipeBackend.entity.Recipe;
import com.example.RecipeBackend.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FavoriteService extends ProductService{
    private RecipeRepository recipeRepository;
    private UserRepository userRepository;
    private FavoriteRepository favoriteRepository;
    private RatingRepository ratingRepository;
    private ViewRepository viewRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, RecipeRepository recipeRepository,
                           UserRepository userRepository,RatingRepository ratingRepository, ViewRepository viewRepository) {
        super(favoriteRepository,ratingRepository,viewRepository);
        this.favoriteRepository = favoriteRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    // gibt all Id von Recipe, die Favorite sind, zurück.
    // wird getListId Methode aufgerufen
    public List<Long> getAllMyFavorite(Long userId){
        return getListId(userRepository,userId);
    }

    // gibt Favorite Recipe List für betimes user maximal 8 Recipe zurück
    // wird getListId Methode aufgerufen
    // wird pageable Methode aufgerufen
    public Page<RecipeResponse> getMyFavorite(Long userId, int page, int size) {
        List<Long> recipeListId = getListId(userRepository,userId);
        return pageable(recipeRepository.findAllById(recipeListId), page, size);
    }

    // register new Favorite mit userId und recipeId
    // sollte drei Bedingungen überprüfen.
    // 1- sollte nicht schon registrieren
    // 2- sollte der User und Recipe in Datenbank existieren, um error zu vermeiden, weil ich CascadeType implementiert habe.
    public void addFavorite(Favorite favorite) {
        Optional<Long> foundedFavoriteEntity =
                favoriteRepository.findByUserIdAndRecipeId(favorite.getUserApp().getId(), favorite.getRecipe().getId());
        boolean isUserExists = userRepository.existsById(favorite.getUserApp().getId());
        boolean isRecipeExists = recipeRepository.existsById(favorite.getRecipe().getId());
        if (foundedFavoriteEntity.isEmpty() && isUserExists && isRecipeExists){
            favoriteRepository.save(favorite);
        }
    }

    // Delete Favorite mit userId und recipeId
    // erst sollte überprüfen werden, ob diese Favorite schon registrieren.
    public void deleteFavorite(Long userId, Long recipeId) {
        Optional<Long> id = favoriteRepository
                .findByUserIdAndRecipeId(userId, recipeId);
        if (id.isPresent()) {
            favoriteRepository.deleteById(id.get());
        }

    }
}
