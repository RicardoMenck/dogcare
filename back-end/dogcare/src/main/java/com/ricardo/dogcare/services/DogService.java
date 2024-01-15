package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.Dog;
import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.entities.enums.UserRole;
import com.ricardo.dogcare.repositories.DogRepository;
import com.ricardo.dogcare.repositories.UserRepository;
import com.ricardo.dogcare.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DogService {



    @Autowired
    DogRepository dogRepository;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    //GET
    public Dog findDogById(Long idDog) {
        logger.info("  Usuário: " + getLogado() + "  verificou o cachorro com id: " + idDog);
        Optional<Dog> dogO = dogRepository.findById(idDog);
        return  dogO.get();
    }

    public List<Dog> listDogs() {
        logger.info("  Usuário: " + getLogado() + "  verificou a lista de cachorros");
        //verifica se o usuario possui a role de ADM
        User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (loggedUser.getRole() == UserRole.ADMIN) {
            return dogRepository.findAll();
        } else {
            //return dogRepository.findAll();
            return dogRepository.findByOwner(loggedUser);
        }
    }



    //POST
    public Dog saveDog(Dog dog) {
        logger.info("  Usuário: " + getLogado() + "  criou o cachorro: " + dog.getIdDog());
        return dogRepository.save(dog);}


    //PUT
    public Dog updateDog(Long idDog, Dog dog) {
        logger.info("  Usuário: " + getLogado() + "  atualizou o cachorro: "+ idDog + " -> " + dog.getDogName());
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
    public void deleteDog(Long idDog) {
        logger.info("  Usuário: " + getLogado() + "  deletou o cachorro com id: "+ idDog);
        dogRepository.deleteById(idDog);}

    private String getLogado(){
        Authentication userLogado = SecurityContextHolder.getContext().getAuthentication();
        if(!(userLogado instanceof AnonymousAuthenticationToken)) {
            return userLogado.getName();
        }
        return "Null";
    }
}

