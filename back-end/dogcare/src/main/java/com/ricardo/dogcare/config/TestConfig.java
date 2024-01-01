package com.ricardo.dogcare.config;

import com.ricardo.dogcare.entities.Order;
import com.ricardo.dogcare.entities.OrderService;
import com.ricardo.dogcare.entities.Services;
import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.entities.enums.UserRole;
import com.ricardo.dogcare.repositories.OrderRepository;
import com.ricardo.dogcare.repositories.OrderServiceRepository;
import com.ricardo.dogcare.repositories.ServicesRepository;
import com.ricardo.dogcare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.util.Arrays;

@Configuration
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ServicesRepository servicesRepository;

    @Autowired
    private OrderServiceRepository orderServiceRepository;

    @Override
    public void run(String... args) throws Exception {

        User u1 = new User("Gabriel Neto", "gabineto@gmail.com", "958542365", "123456", "86000-000", "Rua das martinhas","250",null,"Centro","Londrina","PR", "55555555555", UserRole.USER );
        User u2 = new User("Felipe Kenne", "kenne@gmail.com", "95123145", "456852", "22000-000", "Rua São Paulo","120","bloco B","São Miguel","São Paulo","SP", "11111111111", UserRole.USER );

        userRepository.saveAll(Arrays.asList(u1, u2));

        Order o1 = new Order(Instant.parse("2019-06-20T19:53:07Z"), u1);
        Order o2 = new Order(Instant.parse("2019-07-21T03:42:10Z"), u2);
        Order o3 = new Order( Instant.parse("2019-07-22T15:21:22Z"), u1);

        orderRepository.saveAll(Arrays.asList(o1, o2, o3 ));


        Services s1 = new Services("Banho para Pets", "Proporcione uma experiência relaxante para o seu animal de estimação com nosso banho especial. Inclui shampoo de alta qualidade, condicionamento, secagem e escovação.", 90.00);
        Services s2 = new Services("Check-up Veterinário", "Garanta a saúde do seu pet com nosso check-up veterinário. Inclui exame físico, vacinação básica e orientações personalizadas para cuidados preventivos.", 150.00);
        Services s3 = new Services("Daycare Divertido para Pets", "Deixe seu animal se divertir enquanto você está fora! Nosso serviço de daycare inclui atividades supervisionadas, interação social e lanches saudáveis para o seu pet..", 60.00);
        Services s4 = new Services("Treinamento Obediência Básica", "Desenvolva uma relação mais forte com seu pet através do treinamento de obediência básica. Inclui comandos como sentar, ficar e andar na coleira. Esse Serviço é uma pacote com 5 sessões de treinamento.", 200.00);
        Services s5 = new Services( "Passeio Aventura para Pets", "Proporcione momentos de diversão ao ar livre para seu pet com nosso serviço de passeio aventura. Inclui um passeio guiado, exercícios e interação com a natureza.", 80.00);

        servicesRepository.saveAll(Arrays.asList(s1, s2, s3, s4, s5));

        OrderService os1 = new OrderService(o1, s1, 2, s1.getPrice());
        OrderService os2 = new OrderService(o1, s3, 1, s3.getPrice());
        OrderService os3 = new OrderService(o2, s3, 2, s3.getPrice());
        OrderService os4 = new OrderService(o3, s5, 2, s5.getPrice());

        orderServiceRepository.saveAll(Arrays.asList(os1, os2, os3, os4));
    }
}
