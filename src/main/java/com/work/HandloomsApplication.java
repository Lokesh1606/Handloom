package com.work;

import com.work.config.SymmetricAlgo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy
@SpringBootApplication
public class HandloomsApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(HandloomsApplication.class, args);
//        System.out.println(SymmetricAlgo.encrypt("LOKESH@2108"));
//        System.out.println(SymmetricAlgo.decrypt("tSTj/E+A5tIKm3EKTdUbHQ=="));
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
