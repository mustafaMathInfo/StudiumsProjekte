package com.example.RecipeBackend.entity;


import lombok.*;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserApp {
    @Id
    @GeneratedValue()
    private Long id;
    private String email;
    private BigInteger password;

    @OneToMany(mappedBy = "userApp")
    private List<Recipe> recipes;

    @OneToMany(mappedBy = "userApp")
    private List<Favorite> favorites;

    public UserApp(String email, BigInteger password) {
        this.email = email;
        this.password = password;
    }

    public UserApp(Long id) {
        this.id = id;
    }
}