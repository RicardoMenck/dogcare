package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.Services;
import com.ricardo.dogcare.entities.User;
import com.ricardo.dogcare.entities.enums.UserRole;
import com.ricardo.dogcare.repositories.ServicesRepository;
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
public class ServicesService {

    @Autowired
    ServicesRepository servicesRepository;

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    //GET
    public Services findServiceById(Long idService) {
        logger.info("  Usuário: " + getLogado() + "  verificou o serviço: " + idService);
        Optional<Services> serviceO = servicesRepository.findById(idService);
        return  serviceO.get();
    }

    public List<Services> listServices() {
        logger.info("  Usuário: " + getLogado() + "  verificou a lista de serviços");
        User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (loggedUser.getRole() == UserRole.ADMIN) {
            return servicesRepository.findAll();
        } else {
           return null;
        }
    }

    //POST
    public Services saveService(Services services) {
        logger.info("  Usuário: " + getLogado() + "  criou o serviço: " + services.getIdService());
        return servicesRepository.save(services);}


    //PUT
    public Services updateService(Long idService, Services services) {
        logger.info("  Usuário: " + getLogado() + "  atualizou o serviço: "+ idService + " -> " + services.getName());

        try {
            Services entity = servicesRepository.getReferenceById(idService);
            updateData(entity, services);
            return servicesRepository.save(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(idService);
        }
    }

    private void updateData(Services entity, Services services) {
        entity.setName(services.getName());
        entity.setDescription(services.getDescription());
    }


    //DELETE
    public void deleteService(Long idService) {
        logger.info("  Usuário: " + getLogado() + "  deletou o serviço: "+ idService);
        servicesRepository.deleteById(idService);}

    private String getLogado(){
        Authentication userLogado = SecurityContextHolder.getContext().getAuthentication();
        if(!(userLogado instanceof AnonymousAuthenticationToken)) {
            return userLogado.getName();
        }
        return "Null";
    }

}

