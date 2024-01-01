package com.ricardo.dogcare.controllers;

import com.ricardo.dogcare.entities.Order;
import com.ricardo.dogcare.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    //GET
    @GetMapping
    public ResponseEntity<List<Order>> listOrders() {
        List<Order> list = orderService.listOrders();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{idOrder}")
    public ResponseEntity<Order> findById(@PathVariable(value = "idOrder") Long idOrder) {
        var OrderO = orderService.findOrderById(idOrder);
        return ResponseEntity.ok().body(OrderO);
    }

    //POST
    @PostMapping
    public ResponseEntity<Order> saveOrder(@RequestBody Order order) {
        var orderO = orderService.saveOrder(order);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{idOrder}").buildAndExpand(order.getIdOrder()).toUri();
        return ResponseEntity.created(uri).body(orderO);
    }

    //PUT
    @PutMapping
    public ResponseEntity<Order> updateOrder(@PathVariable(value = "idOrder") Long idOrder, @RequestBody Order order) {
        order = orderService.updateOrder(idOrder, order);
        return ResponseEntity.ok().body(order);
    }

    //DELETE
    @DeleteMapping(value = "/{idOrder}")
    public ResponseEntity<Order> deleteOrder(@PathVariable(value = "idOrder") Long idOrder) {
        orderService.deleteOrder(idOrder);
        return ResponseEntity.noContent().build();
    }

}
