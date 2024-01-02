package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.repositories.UserRepository;
import com.ricardo.dogcare.services.exceptions.DatabaseException;
import com.ricardo.dogcare.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    //GET
    public User findById(Long idUser) {
        logger.info("Finding one person by id! Id searched: " + idUser);
        logger.info("Usuário: " + getLogado() + "est[a verificando o usuário: " + idUser);
        Optional<User> userO = userRepository.findById(idUser);
        return  userO.orElseThrow(() -> new ResourceNotFoundException(idUser));
    }

    public List<User> listUsers(){ return userRepository.findAll();}


    //POST
    public User saveUser(User user) {return userRepository.save(user);}


    //PUT
    public User updateUser(Long idUser, User user) {
        try {
        User entity = userRepository.getReferenceById(idUser);
        updateData(entity, user);
        return userRepository.save(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(idUser);
        }
    }

    private void updateData(User entity, User user) {
        entity.setUserName(user.getUserName());
        entity.setEmail(user.getEmail());
        entity.setPhone(user.getPhone());
        entity.setZipCode(user.getZipCode());
        entity.setAddress(user.getAddress());
        entity.setStreetNumber(user.getStreetNumber());
        entity.setComplement(user.getComplement());
        entity.setNeighborhood(user.getNeighborhood());
        entity.setCity(user.getCity());
        entity.setState(user.getState());
    }


    //DELETE
    public void deleteUser(Long idUser) {
        try {
            userRepository.deleteById(idUser);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(idUser);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }


    private String getLogado(){
        Authentication userLogado = SecurityContextHolder.getContext().getAuthentication();
        if(!(userLogado instanceof AnonymousAuthenticationToken)) {
            return userLogado.getName();
        }
        return "Null";
    }
}
