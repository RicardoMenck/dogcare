package com.ricardo.dogcare.controllers;

import com.ricardo.dogcare.entities.Services;
import com.ricardo.dogcare.services.ServicesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/services")
public class ServicesController {

    private final ServicesService serviceService;
    public ServicesController(ServicesService serviceService) {
        this.serviceService = serviceService;
    }


    //GET
    @GetMapping
    public ResponseEntity<List<Services>> listServices() {
        List<Services> list = serviceService.listServices();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{idServices}")
    public ResponseEntity<Services> findById(@PathVariable(value = "idServices") Long idServices) {
        var serviceO = serviceService.findServiceById(idServices);
        return ResponseEntity.ok().body(serviceO);
    }

    //POST
    @PostMapping
    public ResponseEntity<Services> saveServices(@RequestBody Services service) {
        var serviceO = serviceService.saveService(service);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{idServices}").buildAndExpand(service.getIdService()).toUri();
        return ResponseEntity.created(uri).body(serviceO);
    }

    //PUT
    @PutMapping(value = "/{idServices}")
    public ResponseEntity<Services> updateServices(@PathVariable(value = "idServices") Long idServices, @RequestBody Services service) {
        service = serviceService.updateService(idServices, service);
        return ResponseEntity.ok().body(service);
    }

    //DELETE
    @DeleteMapping(value = "/{idServices}")
    public ResponseEntity<Void> deleteService(@PathVariable(value = "idServices") Long idServices) {
        serviceService.deleteService(idServices);
        return ResponseEntity.noContent().build();
    }

}
