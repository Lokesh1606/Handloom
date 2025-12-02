package com.spirng.guide.repository;

import com.spirng.guide.model.Person;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface PersonRepository extends Neo4jRepository<Person, Long> {
    Person findByName(String name);
}
