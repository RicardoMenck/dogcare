package com.ricardo.dogcare.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "TB_ORDER")
public class Order implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOrder;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant moment;

    @OneToMany(mappedBy = "idOrderServices.order")
    private Set<OrderService> services = new HashSet<>();

    //ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "client_id") //Nome para a chave estrangeira
    private User client;

    //CONSTRUCTORS

    public Order(Instant moment, User client) {
        this.moment = moment;
        this.client = client;
    }

    public Order() {
    }

    //GET AND SET

    public Long getIdOrder() {
        return idOrder;
    }

    public void setIdOrder(Long idOrder) {
        this.idOrder = idOrder;
    }

    public Instant getMoment() {
        return moment;
    }

    public void setMoment(Instant moment) {
        this.moment = moment;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Set<OrderService> getServices() {
        return services;
    }

    public Double getTotal() {
        double sum = 0.0;
        for(OrderService x : services) {
            sum += x.getSubTotal();
        }
        return sum;
    }


    //HASH AND EQUALS
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(idOrder, order.idOrder);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idOrder);
    }
}
