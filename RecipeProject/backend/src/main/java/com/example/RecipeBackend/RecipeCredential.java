package com.example.RecipeBackend;

import com.example.RecipeBackend.entity.UserApp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecipeCredential {
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private String price;
    private String duration;
    private String difficulty;
    private String recipePhoto;
    private String ingredients;
    private String preparation;
    private String category;

    public RecipeCredential(Long userId, String name, String description, String price, String duration, String difficulty, String recipePhoto, String ingredients, String preparation, String category) {
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.difficulty = difficulty;
        this.recipePhoto = recipePhoto;
        this.ingredients = ingredients;
        this.preparation = preparation;
        this.category = category;
    }
}
