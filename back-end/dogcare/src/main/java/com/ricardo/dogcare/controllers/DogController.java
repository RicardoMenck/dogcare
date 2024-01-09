package com.ricardo.dogcare.controllers;

import com.ricardo.dogcare.entities.Dog;
import com.ricardo.dogcare.services.DogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/dog")
public class DogController {

    private final DogService dogService;
    public DogController(DogService dogService) {
        this.dogService = dogService;
    }


    //GET
    @GetMapping
    public ResponseEntity<List<Dog>> listDogs() {
        List<Dog> list = dogService.listDogs();
        return ResponseEntity.ok().body(list);
    }

    //filtro

    @GetMapping(value = "/{idDog}")
    public ResponseEntity<Dog> findById(@PathVariable(value = "idDog") Long idDog) {
        var DogO = dogService.findDogById(idDog);
        return ResponseEntity.ok().body(DogO);
    }

    //Filtro

    //POST
    @PostMapping
    public ResponseEntity<Dog> saveDog(@RequestBody Dog dog) {
        var dogO = dogService.saveDog(dog);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{idDog}").buildAndExpand(dog.getIdDog()).toUri();
        return ResponseEntity.created(uri).body(dogO);
    }

    //PUT
    @PutMapping(value = "/{idDog}")
    public ResponseEntity<Dog> updateDog(@PathVariable(value = "idDog") Long idDog, @RequestBody Dog dog) {
        dog = dogService.updateDog(idDog, dog);
        return ResponseEntity.ok().body(dog);
    }

    //DELETE
    @DeleteMapping(value = "/{idDog}")
    public ResponseEntity<Void> deleteDog(@PathVariable(value = "idDog") Long idDog) {
        dogService.deleteDog(idDog);
        return ResponseEntity.noContent().build();
    }

}
