package com.ricardo.dogcare.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ricardo.dogcare.entities.enums.UserRole;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "TB_USER")
public class User implements Serializable, UserDetails {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;
    private String userName;
    @Column(unique = true)
    private String email;
    private String phone;
    private String password;
    private String zipCode;
    private String address;
    private String streetNumber;
    private String complement;
    private String neighborhood;
    private String city;
    private String state;
    @Column(unique = true )
    private String cpf;
    private UserRole role;

    //ASSOCIATIONS AND GET
    @JsonIgnore
    @OneToMany(mappedBy = "client") //Nome do atributo que está na classe de associação
    private List<Order> orders = new ArrayList<>();

    public List<Order> getOrders() {
        return orders;
    }

    //ASSOCIATION WITH DOG
    @OneToMany(mappedBy = "owner")
    private List<Dog> dogs = new ArrayList<>();

    public List<Dog> getDogs() {return dogs;}


    //USERDETAILS METHODS

    //Se o usuário possuir a permissão de administrador, ele possui os acessos ao admin e user, caso contrário apenas do user.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADIMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    //CONSTRUCTOR
    public User(String userName, String email, String phone, String password, String zipCode, String address, String streetNumber, String complement, String neighborhood, String city, String state, String cpf, UserRole role) {
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.zipCode = zipCode;
        this.address = address;
        this.streetNumber = streetNumber;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.cpf = cpf;
        this.role = role;
    }


    public User() {
    }

    //GET AND SET

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }




    //HASH AND EQUALS

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(idUser, user.idUser);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser);
    }

}
