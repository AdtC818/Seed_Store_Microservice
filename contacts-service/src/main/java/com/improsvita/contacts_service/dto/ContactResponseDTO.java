package com.improsvita.contacts_service.dto;

import com.improsvita.contacts_service.model.Contact;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponseDTO {
    private Long id;
    private String name;
    private String identification;
    private Contact.ContactType contactType;
    private String phone;
    private String email;
    private String address;
    private String city;
    private String observations;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}