package com.work.controller;

import com.work.service.TestService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class TestController {

    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @PostMapping("/profile")
    public String uploadProfilePhoto(@RequestParam("photo") MultipartFile photo){
        return testService.uploadImage(photo);
    }
}
