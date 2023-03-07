package com.example.RecipeBackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating{
    @Id
    @GeneratedValue()
    private Long id;
    private Integer rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private UserApp userApp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    @JsonBackReference
    private Recipe recipe;

    public Rating(Long userId, Long recipeId, Integer rating){
        this.userApp = new UserApp(userId);
        this.recipe = new Recipe(recipeId);
        this.rating = rating;
    }
}
