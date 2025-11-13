package com.improsvita.contacts_service.service;

import com.improsvita.contacts_service.dto.ContactRequestDTO;
import com.improsvita.contacts_service.dto.ContactResponseDTO;
import com.improsvita.contacts_service.dto.ContactUpdateDTO;
import com.improsvita.contacts_service.model.Contact;
import com.improsvita.contacts_service.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {
    
    private final ContactRepository contactRepository;
    
    @Override
    @Transactional
    public ContactResponseDTO createContact(ContactRequestDTO request) {
        if (contactRepository.existsByIdentification(request.getIdentification())) {
            throw new RuntimeException("Ya existe un contacto con esta identificación");
        }
        
        Contact contact = new Contact();
        contact.setName(request.getName());
        contact.setIdentification(request.getIdentification());
        contact.setContactType(request.getContactType());
        contact.setPhone(request.getPhone());
        contact.setEmail(request.getEmail());
        contact.setAddress(request.getAddress());
        contact.setCity(request.getCity());
        contact.setObservations(request.getObservations());
        contact.setActive(true);
        
        Contact saved = contactRepository.save(contact);
        return mapToDTO(saved);
    }
    
    @Override
    @Transactional
    public ContactResponseDTO updateContact(Long id, ContactUpdateDTO updateDTO) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contacto no encontrado"));
        
        if (updateDTO.getName() != null) {
            contact.setName(updateDTO.getName());
        }
        if (updateDTO.getContactType() != null) {
            contact.setContactType(updateDTO.getContactType());
        }
        if (updateDTO.getPhone() != null) {
            contact.setPhone(updateDTO.getPhone());
        }
        if (updateDTO.getEmail() != null) {
            contact.setEmail(updateDTO.getEmail());
        }
        if (updateDTO.getAddress() != null) {
            contact.setAddress(updateDTO.getAddress());
        }
        if (updateDTO.getCity() != null) {
            contact.setCity(updateDTO.getCity());
        }
        if (updateDTO.getObservations() != null) {
            contact.setObservations(updateDTO.getObservations());
        }
        if (updateDTO.getActive() != null) {
            contact.setActive(updateDTO.getActive());
        }
        
        return mapToDTO(contactRepository.save(contact));
    }
    
    @Override
    @Transactional
    public void deleteContact(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contacto no encontrado"));
        
        // Validar que no tenga transacciones activas (esto se validará con otros servicios)
        // Por ahora solo eliminación lógica
        contact.setActive(false);
        contactRepository.save(contact);
    }
    
    @Override
    public ContactResponseDTO getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contacto no encontrado"));
        return mapToDTO(contact);
    }
    
    @Override
    public List<ContactResponseDTO> getAllContacts() {
        return contactRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ContactResponseDTO> getContactsByType(Contact.ContactType type) {
        return contactRepository.findByContactType(type).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ContactResponseDTO> getActiveContacts() {
        return contactRepository.findByActive(true).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public ContactResponseDTO getContactByIdentification(String identification) {
        Contact contact = contactRepository.findByIdentification(identification)
                .orElseThrow(() -> new RuntimeException("Contacto no encontrado"));
        return mapToDTO(contact);
    }
    
    private ContactResponseDTO mapToDTO(Contact contact) {
        ContactResponseDTO dto = new ContactResponseDTO();
        dto.setId(contact.getId());
        dto.setName(contact.getName());
        dto.setIdentification(contact.getIdentification());
        dto.setContactType(contact.getContactType());
        dto.setPhone(contact.getPhone());
        dto.setEmail(contact.getEmail());
        dto.setAddress(contact.getAddress());
        dto.setCity(contact.getCity());
        dto.setObservations(contact.getObservations());
        dto.setActive(contact.getActive());
        dto.setCreatedAt(contact.getCreatedAt());
        dto.setUpdatedAt(contact.getUpdatedAt());
        return dto;
    }
}