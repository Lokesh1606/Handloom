package com.work.service;

import com.work.config.SymmetricAlgo;
import com.work.dto.LoginRequest;
import com.work.dto.LoginResponse;
import com.work.entity.User;
import com.work.repo.UsersRepo;
import com.work.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private static Logger log = LoggerFactory.getLogger(LoginService.class);
    @Lazy
    private final AuthenticationManager authenticationManager;
    private final UsersRepo usersRepo;
    private final UserValidate userValidate;
    private final JwtUtil jwtUtil;

    public LoginService(AuthenticationManager authenticationManager, UsersRepo usersRepo, UserValidate userValidate, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.usersRepo = usersRepo;
        this.userValidate = userValidate;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse validateUser(LoginRequest user)  {
        System.out.println("user details :"+user.toString());
        try{
            User userDetails = usersRepo.findByUserName(user.getEmail());
            if(userDetails!=null && user.getPassword().equals(userDetails.getPassword())){
                return LoginResponse.builder().email(user.getEmail()).statusCode("200").message("Login Successful").build();
            }
//            String encrypted = SymmetricAlgo.encrypt(user.getPassword());
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword())
            );
            String token = "";
            if(authentication.isAuthenticated()) {
                token =  jwtUtil.generateToken(user.getEmail());
            }
            return LoginResponse.builder().email(user.getEmail()).statusCode("200").message("Login Successful").token("").build();
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

        try {
//            String decryptedPassword = userValidate.decryption(loginRequest.getPassword());
//            log.info("decrypted Password : "+decryptedPassword);
//            user.setPassword(SymmetricAlgo.encrypt(loginRequest.getPassword()));
            user.setPassword(loginRequest.getPassword());
        } catch (Exception e) {
            log.error("Exception at encrypting password ",e);

        }
        usersRepo.save(user);
        return "Success";
    }
}
