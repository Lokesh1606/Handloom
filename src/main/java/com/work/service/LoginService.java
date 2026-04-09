package com.work.service;

import com.work.dto.LoginRequest;
import com.work.dto.LoginResponse;
import com.work.entity.User;
import com.work.repo.UsersRepo;
import com.work.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private static Logger log = LoggerFactory.getLogger(LoginService.class);
    @Lazy
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UsersRepo usersRepo;
    private final UserValidate userValidate;
    private final JwtUtil jwtUtil;

    public LoginService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UsersRepo usersRepo, UserValidate userValidate, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.usersRepo = usersRepo;
        this.userValidate = userValidate;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse validateUser(LoginRequest user)  {
        System.out.println("user details :"+user.toString());
        try{
//            uncomment when receiving encrypted password from the angular and change
//            new UsernamePasswordAuthenticationToken(user.getEmail(), decryptedPassword)
            String decryptedPassword = userValidate.decryption(user.getPassword());
            log.info("decrypted Password : "+decryptedPassword);
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), decryptedPassword)
            );
            String token = "";
            if(authentication.isAuthenticated()) {
                token =  jwtUtil.generateToken(user.getEmail());
            }
            return LoginResponse.builder().email(user.getEmail()).statusCode("200").message("Login Successful").token(token).build();
        }catch (Exception e){
            log.error("exception ",e);
            return LoginResponse.builder().email(user.getEmail()).statusCode("403").message("Failed to login").build();
        }
//        return LoginResponse.builder().email(user.getEmail()).statusCode("401").message("Unauthorised "+user.getEmail()).build();
    }

    public String createUser(LoginRequest loginRequest) {
        User user = usersRepo.findByUserName(loginRequest.getEmail());
        log.info("login request : "+loginRequest);
        if(null != user){
          return "User already exist, Please try with different email Id";
        }
        user = new User();
        user.setUserName(loginRequest.getEmail());
        user.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        usersRepo.save(user);
        return "Success";
    }
}
