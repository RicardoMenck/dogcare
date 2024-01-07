package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.Dog;
import com.ricardo.dogcare.repositories.DogRepository;
import com.ricardo.dogcare.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
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
        try {
            Dog entity = dogRepository.getReferenceById(idDog);
            udpateData(entity, dog);
            return dogRepository.save(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(idDog);
        }
    }

    private void udpateData(Dog entity, Dog dog) {
        entity.setDogName(dog.getDogName());
        entity.setBreed(dog.getBreed());
        entity.setColor(dog.getColor());
        entity.setSexo(dog.getSexo());
        entity.setNeutered(dog.isNeutered());
        entity.setPeso(dog.getPeso());
    }


    //DELETE
    public void deleteDog(Long idDog) { dogRepository.deleteById(idDog);}
}

