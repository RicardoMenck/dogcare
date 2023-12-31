package com.ricardo.dogcare.repositories;

import com.ricardo.dogcare.entities.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogRepository extends JpaRepository<Dog, Long> {
}
