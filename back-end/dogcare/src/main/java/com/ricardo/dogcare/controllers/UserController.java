package com.ricardo.dogcare.controllers;

import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    //Injeção
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }



    //GET
    @GetMapping
    public ResponseEntity<List<User>> listUsers() {
        List<User> list = userService.listUsers();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{idUser}")
    public ResponseEntity<User> findById(@PathVariable(value = "idUser") Long idUser) {
        var userO = userService.findById(idUser);
        return ResponseEntity.ok().body(userO);
    }

    //POST
    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        var userO = userService.saveUser(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{idUser}").buildAndExpand(user.getIdUser()).toUri();
        return ResponseEntity.created(uri).body(userO);
    }

    //PUT

    @PutMapping(value = "/{idUser}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "idUser") Long idUser, @RequestBody User user) {
        user = userService.updateUser(idUser, user);
        return ResponseEntity.ok().body(user);
    }

    //DELETE
    @DeleteMapping(value = "/{idUser}")
    public ResponseEntity<Void> deleteUser(@PathVariable(value = "idUser") Long idUser) {
        userService.deleteUser(idUser);
        return ResponseEntity.noContent().build();
    }

}
