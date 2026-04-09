package com.work;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@EnableAspectJAutoProxy
@SpringBootApplication
public class HandloomsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HandloomsApplication.class, args);
	}

    /*@Bean
    public CommandLineRunner commandLineRunner(ApplicationContext context){
        return args ->{
            String[] beanName = context.getBeanDefinitionNames();
            Arrays.sort(beanName);
            for(String bean : beanName){
                System.out.println(bean);
            }

        };
    }*/
}
