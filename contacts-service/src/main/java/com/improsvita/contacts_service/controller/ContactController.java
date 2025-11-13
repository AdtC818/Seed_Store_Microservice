package com.improsvita.contacts_service.controller;

import com.improsvita.contacts_service.dto.ContactRequestDTO;
import com.improsvita.contacts_service.dto.ContactResponseDTO;
import com.improsvita.contacts_service.dto.ContactUpdateDTO;
import com.improsvita.contacts_service.model.Contact;
import com.improsvita.contacts_service.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
public class ContactController {
    
    private final ContactService contactService;
    
    @PostMapping
    public ResponseEntity<ContactResponseDTO> createContact(@RequestBody ContactRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.createContact(request));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ContactResponseDTO> updateContact(@PathVariable Long id,
                                                             @RequestBody ContactUpdateDTO updateDTO) {
        return ResponseEntity.ok(contactService.updateContact(id, updateDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ContactResponseDTO> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }
    
    @GetMapping
    public ResponseEntity<List<ContactResponseDTO>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<ContactResponseDTO>> getContactsByType(@PathVariable Contact.ContactType type) {
        return ResponseEntity.ok(contactService.getContactsByType(type));
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<ContactResponseDTO>> getActiveContacts() {
        return ResponseEntity.ok(contactService.getActiveContacts());
    }
    
    @GetMapping("/identification/{identification}")
    public ResponseEntity<ContactResponseDTO> getContactByIdentification(@PathVariable String identification) {
        return ResponseEntity.ok(contactService.getContactByIdentification(identification));
    }
}