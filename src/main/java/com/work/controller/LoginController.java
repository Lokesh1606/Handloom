package com.work.controller;

import com.work.dto.LoginRequest;
import com.work.dto.LoginResponse;
import com.work.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LoginController {
    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }


    @GetMapping("Hello")
    public String checkApi() {
        return "DONE";
    }

    @PostMapping("/login")
    public LoginResponse loginSubmit(@RequestBody LoginRequest loginRequest) {
        return loginService.validateUser(loginRequest);
    }

    @PostMapping("/signUp")
    public String signUp(@RequestBody LoginRequest loginRequest){
        return loginService.createUser(loginRequest);
    }

}
