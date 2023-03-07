package com.example.RecipeBackend;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.math.BigInteger;

@Component
public class Security {
    private final BigInteger p = new BigInteger("52869082357465819");
    private final BigInteger x = new BigInteger("21963059235275844");
    private final BigInteger y = new BigInteger("49170834336974675");

    public BigInteger bcrypt(String password){
        return bcrypt(password, x);
    }

    private BigInteger bcrypt(String password, BigInteger exponent) {
        BigInteger g = BigInteger.ZERO;
        for (int i = 0; i < password.length(); i++) {
            g = g.add(BigInteger.valueOf((int) password.charAt(i)));
        }
        return g.modPow(exponent, p);
    }



    public boolean comparePassword(BigInteger encryptedPassword, String password) {
        System.out.println("X: " + bcrypt(password,y));
        System.out.println("y: " + encryptedPassword);

        BigInteger exp1 = encryptedPassword.modPow(y, p);
        BigInteger exp2 = bcrypt(password,y).modPow(x, p);
        System.out.println("KX: " + exp1);
        System.out.println("KY: " + exp2);

        return exp1.equals(exp2);
    }
}
