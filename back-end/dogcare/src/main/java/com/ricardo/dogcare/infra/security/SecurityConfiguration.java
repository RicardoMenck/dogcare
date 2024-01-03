package com.ricardo.dogcare.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
// SS =  Spring Security
//Classe de configuração, em que vamos desabilitar as configurações padrão do Spring Security(SS) e personalizar as configurações.

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Value("$app.connect.url")
    private String connection ;

    @Autowired
    private SecurityFilter securityFilter;

    //Corrente de filtro de segurança, a corrente de filtro que vamos aplicar em uma requisição para a segurança de minha aplicação. Os filtros são métodos para realizar validações dos usuário que estão chamando requisições da aplicação, ao executar os filtros retorna uma permissão ou bloqueio da requisição do usuário.

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        //Aqui declaramos nossa configuração para o SS
        /*
        * Autenticação Stateless;
        * Quais requisições http serão autenticadas com permissão de admin;
        * Senão apenas com autentição de usuario pode ser acessada.
        * */
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/admin**").hasRole("ADMIN")
                        .requestMatchers("/login", "/login/**").permitAll()
                        .requestMatchers(HttpMethod.GET).permitAll()
                        .requestMatchers(HttpMethod.POST).permitAll()
                        .requestMatchers(HttpMethod.PUT).permitAll()
                        .requestMatchers(HttpMethod.DELETE).permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/user").hasRole("ADMIN").anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

/*    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        var corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:4200");
        corsConfig.addAllowedMethod("*");
        corsConfig.addAllowedHeader("*");

        var url = new UrlBasedCorsConfigurationSource();
        url.registerCorsConfiguration("/**", corsConfig);

        return url;

    }*/

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
