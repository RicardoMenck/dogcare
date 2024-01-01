package com.ricardo.dogcare.entities.pk;

import com.ricardo.dogcare.entities.Order;
import com.ricardo.dogcare.entities.Services;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;
import java.util.Objects;


@Embeddable
public class OrderServicesPK implements Serializable {
    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "order_id")  //Nome da chave estrangeira na tabela
    private Order order;

    @ManyToOne
    @JoinColumn(name = "services_id")
    private Services services;

    //CONSTRUCTOR
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Services getServices() {
        return services;
    }

    public void setServices(Services services) {
        this.services = services;
    }

    //HASH AND EQUALS

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderServicesPK that = (OrderServicesPK) o;
        return Objects.equals(order, that.order) && Objects.equals(services, that.services);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order, services);
    }
}
