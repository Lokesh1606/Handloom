package com.work.repo;

import com.work.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<User,Integer> {
    User findByUserName(String username);
}
