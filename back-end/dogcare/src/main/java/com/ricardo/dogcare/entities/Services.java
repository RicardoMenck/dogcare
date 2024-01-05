package com.ricardo.dogcare.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "TB_SERVICES")
public class Services implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idService;
    private String name;
    private String description;
    private Double price;


    @ManyToOne
    @JoinColumn(name = "pet_id") //Nome para a chave estrangeira
    private Dog pet;

    //Colocar o cachorro também nos service??

    //ASSOCIATIONS
    //CONSTRUCTORS
    public Services(String name, String description, Double price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Services() {
    }

    //GET AND SET

    public Long getIdService() {
        return idService;
    }

    public void setIdService(Long idService) {
        this.idService = idService;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    //HASH AND EQUALS

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Services services = (Services) o;
        return Objects.equals(idService, services.idService);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idService);
    }
}
