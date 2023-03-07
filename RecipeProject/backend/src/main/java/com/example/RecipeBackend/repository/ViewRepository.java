package com.example.RecipeBackend.repository;

import com.example.RecipeBackend.entity.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ViewRepository extends JpaRepository<View, Long> {

    @Query(value="SELECT id FROM View WHERE View.user_id = ?1 And View.recipe_id= ?2", nativeQuery = true)
    Optional<Long> findByUserIdAndRecipeId(Long userId, Long recipeId);

    @Query(value="SELECT count(id) FROM View WHERE View.recipe_id= ?1", nativeQuery = true)
    int findViewNumberByRecipeId(Long recipeId);
}

