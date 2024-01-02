package com.ricardo.dogcare.entities;

import com.ricardo.dogcare.entities.enums.DogS;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "TB_DOG")
public class Dog implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDog;
    private String dogName;
    private String breed;
    private String color;
    @Enumerated(EnumType.STRING)
    private DogS sexo;
    private boolean neutered;
    private double peso;

    //ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "owner_id") //Nome para a chave estrangeira
    private User owner;


    //CONSTRUCTOR
    public Dog(String dogName, String breed, String color, DogS sexo, boolean neutered, double peso) {
        this.dogName = dogName;
        this.breed = breed;
        this.color = color;
        this.sexo = sexo;
        this.neutered = neutered;
        this.peso = peso;
    }

    public Dog() {
    }

    //GET AND SET
    public Long getIdDog() {
        return idDog;
    }

    public void setIdDog(Long idDog) {
        this.idDog = idDog;
    }

    public String getDogName() {
        return dogName;
    }

    public void setDogName(String dogName) {
        this.dogName = dogName;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public DogS getSexo() {
        return sexo;
    }

    public void setSexo(DogS sexo) {
        this.sexo = sexo;
    }

    public boolean isNeutered() {
        return neutered;
    }

    public void setNeutered(boolean neutered) {
        this.neutered = neutered;
    }

    public double getPeso() {
        return peso;
    }

    public void setPeso(double peso) {
        this.peso = peso;
    }

    //HASH AND EQUAL
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Dog dog = (Dog) o;
        return Objects.equals(idDog, dog.idDog);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idDog);
    }
}
