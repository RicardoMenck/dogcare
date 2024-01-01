package com.ricardo.dogcare.services;

import com.ricardo.dogcare.entities.Order;
import com.ricardo.dogcare.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    //GET
    public Order findOrderById(Long idOrder) {
        Optional<Order> orderO = orderRepository.findById(idOrder);
        return  orderO.get();
    }

    public List<Order> listOrders(){ return orderRepository.findAll();}


    //POST
    public Order saveOrder(Order order) {return orderRepository.save(order);}


    //PUT
    public Order updateOrder(Long idOrder, Order order) {
        Order entity = orderRepository.getReferenceById(idOrder);
        return orderRepository.save(entity);
    }


    //DELETE
    public void deleteOrder(Long idOrder) { orderRepository.deleteById(idOrder);}
}

