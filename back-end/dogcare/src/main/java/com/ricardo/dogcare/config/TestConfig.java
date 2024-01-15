package com.ricardo.dogcare.config;

import com.ricardo.dogcare.entities.Services;
import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.entities.enums.UserRole;
import com.ricardo.dogcare.repositories.ServicesRepository;
import com.ricardo.dogcare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class TestConfig {

        //implements CommandLineRunner {

//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private ServicesRepository servicesRepository;



//   @Override
//  public void run(String... args) throws Exception {
////
////        User u1 = new User("Gabriel Neto", "gabineto@gmail.com", "958542365", "123456", "86000-000", "Rua das martinhas","250",null,"Centro","Londrina","PR", "55555555555", UserRole.USER );
////        User u2 = new User("Felipe Kenne", "kenne@gmail.com", "95123145", "456852", "22000-000", "Rua São Paulo","120","bloco B","São Miguel","São Paulo","SP", "11111111111", UserRole.USER );
////
////        userRepository.saveAll(Arrays.asList(u1, u2));
//
//
//        Services s1 = new Services("Banho para Pets", "Proporcione uma experiência relaxante para o seu animal de estimação com nosso banho especial. Inclui shampoo de alta qualidade, condicionamento, secagem e escovação.");
//        Services s2 = new Services("Check-up Veterinário", "Garanta a saúde do seu pet com nosso check-up veterinário. Inclui exame físico, vacinação básica e orientações personalizadas para cuidados preventivos.");
//        Services s3 = new Services("Daycare Divertido para Pets", "Deixe seu animal se divertir enquanto você está fora! Nosso serviço de daycare inclui atividades supervisionadas, interação social e lanches saudáveis para o seu pet..");
//        Services s4 = new Services("Treinamento Obediência Básica", "Desenvolva uma relação mais forte com seu pet através do treinamento de obediência básica. Inclui comandos como sentar, ficar e andar na coleira. Esse Serviço é uma pacote com 5 sessões de treinamento.");
//        Services s5 = new Services( "Passeio Aventura para Pets", "Proporcione momentos de diversão ao ar livre para seu pet com nosso serviço de passeio aventura. Inclui um passeio guiado, exercícios e interação com a natureza.");
//
//        servicesRepository.saveAll(Arrays.asList(s1, s2, s3, s4, s5));
//
//    }
}
