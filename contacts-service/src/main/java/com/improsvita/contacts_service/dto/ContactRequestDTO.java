package com.improsvita.contacts_service.dto;

import com.improsvita.contacts_service.model.Contact;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequestDTO {
    private String name;
    private String identification;
    private Contact.ContactType contactType;
    private String phone;
    private String email;
    private String address;
    private String city;
    private String observations;
}