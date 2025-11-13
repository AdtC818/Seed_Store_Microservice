package com.improsvita.contacts_service.service;

import com.improsvita.contacts_service.dto.ContactRequestDTO;
import com.improsvita.contacts_service.dto.ContactResponseDTO;
import com.improsvita.contacts_service.dto.ContactUpdateDTO;
import com.improsvita.contacts_service.model.Contact;
import java.util.List;

public interface ContactService {
    ContactResponseDTO createContact(ContactRequestDTO request);
    ContactResponseDTO updateContact(Long id, ContactUpdateDTO updateDTO);
    void deleteContact(Long id);
    ContactResponseDTO getContactById(Long id);
    List<ContactResponseDTO> getAllContacts();
    List<ContactResponseDTO> getContactsByType(Contact.ContactType type);
    List<ContactResponseDTO> getActiveContacts();
    ContactResponseDTO getContactByIdentification(String identification);
}