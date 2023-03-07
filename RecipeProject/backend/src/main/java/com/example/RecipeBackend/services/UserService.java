package com.example.RecipeBackend.services;

import com.example.RecipeBackend.AccountCredentials;
import com.example.RecipeBackend.Security;
import com.example.RecipeBackend.entity.UserApp;
import com.example.RecipeBackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;
    private Security security;

    public UserService(UserRepository userRepository, Security security) {
        this.userRepository = userRepository;
        this.security = security;
    }

    // Register User mit E-Mail und Password
    // wird überprüft, ob E-Mail schon in Datenbank vorhanden ist. wenn nicht, dann Register is Succeeded

    public AccountCredentials register(AccountCredentials accountCredentials) {
        Optional<UserApp> foundedUserByEmail = userRepository.findByEmail(accountCredentials.getEmail());
        AccountCredentials userAccount = new AccountCredentials("Email Exists");

        if (foundedUserByEmail.isEmpty()) {
            BigInteger encryptedPassword = security.bcrypt(accountCredentials.getPassword());
            userRepository.save(new UserApp(accountCredentials.getEmail(), encryptedPassword));
            userAccount.setEmail("Register Succeeded");
        }
        return userAccount;
    }

    // Login mit Email und Password
    //  wird überprüft, ob E-Mail schon in Datenbank vorhanden ist. wenn Ja, dann wird Password verglichen.
    public AccountCredentials login(AccountCredentials accountCredentials) {
        AccountCredentials userAccount = new AccountCredentials("Email Or Password Not Correct");
        Optional<UserApp> foundedUserByEmail = userRepository.findByEmail(accountCredentials.getEmail());

        if (foundedUserByEmail.isPresent()) {
          boolean  comparedPassword = security.comparePassword(foundedUserByEmail.get().getPassword(),
                    accountCredentials.getPassword());
            if (comparedPassword == true) {
                userAccount.setId(foundedUserByEmail.get().getId());
                userAccount.setEmail("Login Succeeded");
            }
        }
        return userAccount;
    }
}
