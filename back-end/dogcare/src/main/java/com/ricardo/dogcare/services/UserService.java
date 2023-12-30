package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    //GET
    public User findById(Long idUser) {
        Optional<User> userO = userRepository.findById(idUser);
        return  userO.get();
    }

    public List<User> listUsers(){ return userRepository.findAll();}


    //POST
    public User saveUser(User user) {return userRepository.save(user);}


    //PUT
    public User updateUser(Long idUser, User user) {
        User entity = userRepository.getReferenceById(idUser);
        return userRepository.save(entity);
    }


    //DELETE
    public void deleteUser(Long idUser) { userRepository.deleteById(idUser);}
}
