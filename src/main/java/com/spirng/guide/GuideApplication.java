package com.spirng.guide;

import com.spirng.guide.model.Person;
import com.spirng.guide.repository.PersonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class GuideApplication {

	public static void main(String[] args) {
		SpringApplication.run(GuideApplication.class, args);
		System.exit(0);
	}


	@Bean
	CommandLineRunner demo(PersonRepository personRepository){
		return args -> {
			personRepository.deleteAll();
			Person lokesh = new Person("Lokesh");
			Person venki = new Person("Venki");
			Person yellesh = new Person("Yellesh");

			List<Person> personList = Arrays.asList(lokesh,venki,yellesh);
			System.out.println("Working here");


			personList.stream().forEach(person -> System.out.println(person.getName()));


			personRepository.save(lokesh);
			personRepository.save(venki);
			personRepository.save(yellesh);


			lokesh = personRepository.findByName(lokesh.getName());

			lokesh.worksWith(venki);
			lokesh.worksWith(yellesh);
			personRepository.save(lokesh);
		};
	}

}
