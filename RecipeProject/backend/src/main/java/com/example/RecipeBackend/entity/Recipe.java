package com.example.RecipeBackend.entity;

import com.example.RecipeBackend.RecipeCredential;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue()
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private UserApp userApp;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Rating> ratings;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<View> views;

    @NotBlank(message = "Recipe-Name can not be Empty")
    private String name;

    @NotBlank(message = "Recipe-Description can not be Empty")
    private String description;

    @NotBlank(message = "Recipe-Price can not be Empty")
    private String price;

    @NotBlank(message = "Recipe-Duration can not be Empty")
    private String duration;

    @NotBlank(message = "Recipe Difficulty can not be Empty")
    private String difficulty;

     @NotBlank(message = "Recipe-Photo can not be Empty")
     @Column(columnDefinition = "text")
     private String recipePhoto;

    @NotBlank(message = "Recipe-Ingredients can not be Empty")
    private String ingredients;

    @NotBlank(message = "Recipe-Preparation can not be Empty")
    private String preparation;

    @NotBlank(message = "Recipe-Category can not be Empty")
    private String category;

    public Recipe(RecipeCredential recipeCredential) {
        this.userApp = new UserApp(recipeCredential.getUserId());
        this.name = recipeCredential.getName();
        this.description = recipeCredential.getDescription();
        this.price = recipeCredential.getPrice();
        this.duration = recipeCredential.getDuration();
        this.difficulty = recipeCredential.getDifficulty();
        this.recipePhoto = recipeCredential.getRecipePhoto();
        this.ingredients = recipeCredential.getIngredients();
        this.preparation = recipeCredential.getPreparation();
        this.category = recipeCredential.getCategory();
    }

    public Recipe(Long id,RecipeCredential recipeCredential) {
        this.id = id;
        this.userApp = new UserApp(recipeCredential.getUserId());
        this.name = recipeCredential.getName();
        this.description = recipeCredential.getDescription();
        this.price = recipeCredential.getPrice();
        this.duration = recipeCredential.getDuration();
        this.difficulty = recipeCredential.getDifficulty();
        this.recipePhoto = recipeCredential.getRecipePhoto();
        this.ingredients = recipeCredential.getIngredients();
        this.preparation = recipeCredential.getPreparation();
        this.category = recipeCredential.getCategory();
    }

    public Recipe(Long id){
        this.id = id;
    }


}
