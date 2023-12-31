package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.Dog;

import com.ricardo.dogcare.repositories.DogRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class DogService {

    @Autowired
    DogRepository dogRepository;

    //GET
    public Dog findDogById(Long idDog) {
        Optional<Dog> dogO = dogRepository.findById(idDog);
        return  dogO.get();
    }

    public List<Dog> listDogs(){ return dogRepository.findAll();}


    //POST
    public Dog saveDog(Dog dog) {return dogRepository.save(dog);}


    //PUT
    public Dog updateDog(Long idDog, Dog dog) {
        Dog entity = dogRepository.getReferenceById(idDog);
        return dogRepository.save(entity);
    }


    //DELETE
    public void deleteDog(Long idDog) { dogRepository.deleteById(idDog);}
}
}
