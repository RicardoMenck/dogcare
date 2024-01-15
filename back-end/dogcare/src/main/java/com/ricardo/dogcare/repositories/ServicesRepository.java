package com.ricardo.dogcare.repositories;

import com.ricardo.dogcare.entities.Services;
import com.ricardo.dogcare.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicesRepository extends JpaRepository<Services, Long> {

    List<Services> findByPet(User pet);
}
