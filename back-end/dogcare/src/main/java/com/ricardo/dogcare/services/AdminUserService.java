package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.entities.enums.UserRole;
import com.ricardo.dogcare.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {

     private final UserRepository userRepository;

     public AdminUserService(UserRepository userRepository) {
         this.userRepository = userRepository;
     }


     @PostConstruct
     public void createAdminAccount(){
         User adminAccount = userRepository.findByRole(UserRole.ADMIN);
         if(adminAccount == null) {
             var admin = new User();
             admin.setEmail("admin@dogcare.com");
             admin.setUserName("admin");
             admin.setRole(UserRole.ADMIN);
             admin.setPassword(new BCryptPasswordEncoder().encode("adminer"));
             userRepository.save(admin);
         }
     }
}
