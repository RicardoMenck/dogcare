package com.ricardo.dogcare.dto;

import com.ricardo.dogcare.entities.enums.UserRole;

public record RegisterDTO(String userName, String email, String phone, String password, String zipCode, String address, String streetNumber, String complement, String neighborhood, String city, String state, String cpf, UserRole role) {
}
