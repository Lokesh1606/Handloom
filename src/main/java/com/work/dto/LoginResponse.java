package com.work.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private String email;
    private String token;
    private String message;
    private String statusCode;

}
