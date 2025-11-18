package com.improsvita.sowing_service.service;

import com.improsvita.sowing_service.client.ContactClient;
import com.improsvita.sowing_service.client.SeedClient;
import com.improsvita.sowing_service.dto.ContactRemoteDTO;
import com.improsvita.sowing_service.dto.SeedRemoteDTO;
import com.improsvita.sowing_service.dto.SowingDTO;
import com.improsvita.sowing_service.model.Sowing;
import com.improsvita.sowing_service.repository.SowingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SowingService {

    private final SowingRepository repository;
    private final SeedClient seedClient;
    private final ContactClient contactClient;

    public SowingService(SowingRepository repository,
                         SeedClient seedClient,
                         ContactClient contactClient) {
        this.repository = repository;
        this.seedClient = seedClient;
        this.contactClient = contactClient;
    }

    private SowingDTO toDTO(Sowing s) {
        SowingDTO dto = new SowingDTO();
        dto.setId(s.getId());
        dto.setSeedId(s.getSeedId());
        dto.setSeedName(s.getSeedName());
        dto.setQuantity(s.getQuantity());
        dto.setStartDate(s.getStartDate());
        dto.setHarvestDate(s.getHarvestDate());
        dto.setObservations(s.getObservations());
        dto.setFumigationFrequency(s.getFumigationFrequency());
        dto.setStatus(s.getStatus());
        dto.setAvailabilityStatus(s.getAvailabilityStatus());
        dto.setContactId(s.getContactId());
        dto.setContactName(s.getContactName());
        return dto;
    }

    private Sowing toEntity(SowingDTO dto) {
        Sowing s = new Sowing();
        s.setId(dto.getId());
        s.setSeedId(dto.getSeedId());
        s.setSeedName(dto.getSeedName());
        s.setQuantity(dto.getQuantity());
        s.setStartDate(dto.getStartDate());
        s.setHarvestDate(dto.getHarvestDate());
        s.setObservations(dto.getObservations());
        s.setFumigationFrequency(dto.getFumigationFrequency());
        s.setStatus(dto.getStatus());
        s.setAvailabilityStatus(dto.getAvailabilityStatus());
        s.setContactId(dto.getContactId());
        s.setContactName(dto.getContactName());
        return s;
    }

    // ----------------------------------
    // CREAR SIEMBRA
    // ----------------------------------
    @Transactional
    public SowingDTO create(SowingDTO dto) {

        if (dto.getSeedId() == null)
            throw new IllegalArgumentException("Debe indicar seedId");

        SeedRemoteDTO remoteSeed = seedClient.getSeedById(dto.getSeedId());
        if (remoteSeed == null)
            throw new IllegalArgumentException("Semilla no encontrada");

        if (remoteSeed.getQuantity() < dto.getQuantity())
            throw new IllegalArgumentException("Stock insuficiente");

        dto.setSeedName(remoteSeed.getPlantName());

        // Estado inicial del ciclo
        dto.setStatus("Sembrada");

        // Disponibilidad
        if (dto.getContactId() != null) {
            ContactRemoteDTO contact = contactClient.getContactById(dto.getContactId());
            if (contact == null)
                throw new IllegalArgumentException("El contacto no existe");

            dto.setContactName(contact.getName());
            dto.setAvailabilityStatus("Apartada");
        } else {
            dto.setAvailabilityStatus("Disponible");
        }

        // Descontar stock
        seedClient.reduceStock(dto.getSeedId(), dto.getQuantity());

        Sowing saved = repository.save(toEntity(dto));
        return toDTO(saved);
    }

    // ----------------------------------
    // ACTUALIZAR SIEMBRA (contacto o disponibilidad)
    // ----------------------------------
    public SowingDTO update(Long id, SowingDTO dto) {

        Sowing existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Siembra no encontrada"));

        // Cambiar contacto
        if (dto.getContactId() != null) {
            ContactRemoteDTO contact = contactClient.getContactById(dto.getContactId());
            if (contact == null)
                throw new IllegalArgumentException("Contacto no existe");

            existing.setContactId(contact.getId());
            existing.setContactName(contact.getName());
            existing.setAvailabilityStatus("Apartada");
        } else {
            existing.setContactId(null);
            existing.setContactName(null);
            existing.setAvailabilityStatus("Disponible");
        }

        return toDTO(repository.save(existing));
    }

    // ----------------------------------
    // ACTUALIZAR SOLO EL ESTADO DEL CICLO
    // ----------------------------------
    public SowingDTO updateStatus(Long id, String status) {

        Sowing existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Siembra no existe"));

        existing.setStatus(status); // SOLO CAMBIA ciclo
        return toDTO(repository.save(existing));
    }

    // ----------------------------------
    public List<SowingDTO> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<SowingDTO> getActive() {
        return repository.findAll()
                .stream()
                .filter(s -> "Apartada".equalsIgnoreCase(s.getAvailabilityStatus()))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public SowingDTO getById(Long id) {
        return repository.findById(id).map(this::toDTO).orElse(null);
    }

    public boolean delete(Long id) {
        if (!repository.existsById(id))
            throw new RuntimeException("Siembra no encontrada");
        repository.deleteById(id);
        return true;
    }
}


