package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.Services;
import com.ricardo.dogcare.repositories.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicesService {

    @Autowired
    ServicesRepository servicesRepository;

    //GET
    public Services findServiceById(Long idService) {
        Optional<Services> serviceO = servicesRepository.findById(idService);
        return  serviceO.get();
    }

    public List<Services> listServices(){ return servicesRepository.findAll();}


    //POST
    public Services saveService(Services services) {return servicesRepository.save(services);}


    //PUT
    public Services updateService(Long idService, Services services) {
        Services entity = servicesRepository.getReferenceById(idService);
        return servicesRepository.save(entity);
    }


    //DELETE
    public void deleteService(Long idService) { servicesRepository.deleteById(idService);}
}

