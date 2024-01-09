package com.ricardo.dogcare.repositories;

import com.ricardo.dogcare.entities.Dog;
import com.ricardo.dogcare.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DogRepository extends JpaRepository<Dog, Long> {
    List<Dog> findByOwner(User owner);
}
