package com.example.RecipeBackend.dataLoader;

import com.example.RecipeBackend.AccountCredentials;
import com.example.RecipeBackend.repository.UserRepository;
import com.example.RecipeBackend.services.UserService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;


@Component
public class UserDataLoader implements ApplicationRunner {
    UserRepository userRepository;
    UserService userService;

    public UserDataLoader(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (userRepository.count() == 0) {
            userService.register(new AccountCredentials("Waleed@yahoo.com", "12345678"));
            userService.register(new AccountCredentials("mostafa@yahoo.com", "12345678"));
            userService.register(new AccountCredentials("Elias@yahoo.com", "12345678"));
        }
    }
}
