package com.ricardo.dogcare.entities;

import com.ricardo.dogcare.entities.enums.UserRole;

public record RegisterDTO(String email, String password, UserRole role) {
}
