package com.ricardo.dogcare.config;

import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

       User u1 = new User(null,"Gabriel Neto", "gabineto@gmail.com", "958542365", "123456", "86000-000", "Rua das martinhas","250",null,"Centro","Londrina","PR", "55555555555" );

       userRepository.saveAll(Arrays.asList(u1));
    }
}
