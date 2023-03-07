package com.example.RecipeBackend.repository;

import com.example.RecipeBackend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query(value="SELECT id FROM Rating WHERE Rating.user_id = ?1 And Rating.recipe_id= ?2", nativeQuery = true)
    Optional<Long> findByUserIdAndRecipeId(Long userId, Long recipeId);

    @Query(value="SELECT avg(rating) FROM Rating WHERE Rating.recipe_id= ?1", nativeQuery = true)
    Optional<Double> findRatingByRecipeId(Long recipeId);
}
