package com.work.util;

import com.work.config.SymmetricAlgo;

public class Test {
    public static void main(String[] args) throws Exception {
        String plainPassword = "lokesh";
        System.out.println(SymmetricAlgo.encrypt(plainPassword));
        String encrypted = "F4Cr90N/GYz3TtFQQHU9GQ==";
        System.out.println(SymmetricAlgo.decrypt(encrypted));
    }
}
