package com.example.RecipeBackend.controller;

import com.example.RecipeBackend.entity.Favorite;
import com.example.RecipeBackend.entity.View;
import com.example.RecipeBackend.services.ViewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "api/view")
public class ViewController {
    private ViewService viewService;

    public ViewController(ViewService viewService) {
        this.viewService = viewService;
    }

    // register new view mit userId und recipeId
    @PostMapping
    public ResponseEntity<Void> registerNewView(@RequestParam("userId") Optional<Long> userId,
                                                  @RequestParam("recipeId") Optional<Long> recipeId) {
        if (userId.isPresent() && recipeId.isPresent()) {
            viewService.addView(new View(userId.get(), recipeId.get()));
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
