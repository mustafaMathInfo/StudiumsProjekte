package com.example.RecipeBackend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class RecipeResponse {
    private Long id;
    private Long userId;
    private String name;
    private Integer favorites;
    private Double ratings;
    private Integer views;
    private String description;
    private String price;
    private String duration;
    private String difficulty;
    private String recipePhoto;
    private String ingredients;
    private String preparation;
    private String category;
}
