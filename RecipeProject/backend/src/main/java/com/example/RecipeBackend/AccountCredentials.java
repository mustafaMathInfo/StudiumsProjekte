package com.example.RecipeBackend;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountCredentials{
    private Long id;

    @NotBlank(message = "Email can not be Empty")
    @Email(message = "Email must be Valid")
    private String email;

    @NotBlank(message = "Password can not be Empty")
    @Length(min = 8, message = "The Password must be at Least 8 characters")
    private String password;


    public AccountCredentials(String email) {
        this.email = email;
    }

    public AccountCredentials(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
