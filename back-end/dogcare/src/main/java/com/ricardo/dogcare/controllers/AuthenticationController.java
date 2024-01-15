package com.ricardo.dogcare.controllers;

import com.ricardo.dogcare.dto.AuthenticationDTO;
import com.ricardo.dogcare.dto.LoginResponseDTO;
import com.ricardo.dogcare.dto.RegisterDTO;
import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.infra.security.TokenService;
import com.ricardo.dogcare.repositories.UserRepository;
import com.ricardo.dogcare.services.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToke((User)auth.getPrincipal());
        logger.info("  Usuário: " + data.email() + "  está realizando login! " );
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if(this.userRepository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.userName(), data.email(), data.phone(), encryptedPassword, data.zipCode(),data.address(),data.streetNumber(), data.complement(),data.neighborhood(), data.city(), data.state(), data.cpf(), data.role());
        this.userRepository.save(newUser);

        logger.info("  Usuário: " + newUser.getUserName() + "  foi registrado: email: " + newUser.getEmail()+ " id: " + newUser.getIdUser());

        return ResponseEntity.ok().build();
    }
}
