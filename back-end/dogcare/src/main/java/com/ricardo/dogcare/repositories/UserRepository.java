package com.ricardo.dogcare.repositories;

import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.entities.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //Metodo para consultar o user através do email/login;
    UserDetails findByEmail(String email);

    User findByRole(UserRole userRole);
}
