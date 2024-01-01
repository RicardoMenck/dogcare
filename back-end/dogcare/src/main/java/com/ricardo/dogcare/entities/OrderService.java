package com.ricardo.dogcare.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ricardo.dogcare.entities.pk.OrderServicesPK;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "TB_ORDER_SERVICES")
public class OrderService implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private OrderServicesPK idOrderServices = new OrderServicesPK();
    private Integer quantity;
    private Double price;

    //CONSTRUCTOR

    public OrderService(Order order, Services services, Integer quantity, Double price) {
        idOrderServices.setOrder(order);
        idOrderServices.setServices(services);
        this.quantity = quantity;
        this.price = price;
    }

    public OrderService() {
    }

    //GET AND SET OF PK

    @JsonIgnore
    public Order getOrder () {
        return idOrderServices.getOrder();
    }

    public void setOrder(Order order) {
        idOrderServices.setOrder(order);
    }


    public Services getServices () {
        return idOrderServices.getServices();
    }


    public void setServices(Services services) {
        idOrderServices.setServices(services);
    }


    //GET AND SET

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getSubTotal() {
        return price * quantity;
    }

    //HASH AND EQUALS

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderService that = (OrderService) o;
        return Objects.equals(idOrderServices, that.idOrderServices);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idOrderServices);
    }
}
