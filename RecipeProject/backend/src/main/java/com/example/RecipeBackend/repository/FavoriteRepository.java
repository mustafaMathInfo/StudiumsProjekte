package com.example.RecipeBackend.repository;

import com.example.RecipeBackend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long>{

    @Query(value="SELECT id FROM Favorite WHERE Favorite.user_id = ?1 And Favorite.recipe_id= ?2", nativeQuery = true)
    Optional<Long> findByUserIdAndRecipeId(Long userId, Long recipeId);

    @Query(value="SELECT count(id) FROM Favorite WHERE Favorite.recipe_id= ?1", nativeQuery = true)
    int findFavoriteNumberByRecipeId(Long recipeId);
}
