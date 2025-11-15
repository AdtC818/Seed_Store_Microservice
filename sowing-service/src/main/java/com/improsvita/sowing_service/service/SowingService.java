package com.improsvita.sowing_service.service;

import com.improsvita.sowing_service.dto.SowingDTO;
import com.improsvita.sowing_service.model.Sowing;
import com.improsvita.sowing_service.repository.SowingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SowingService {

    @Autowired
    private SowingRepository repository;

    // Crear
    public SowingDTO create(SowingDTO dto) {
        Sowing entity = toEntity(dto);
        Sowing saved = repository.save(entity);
        return toDTO(saved);
    }

    // Listar全部
    public List<SowingDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).toList();
    }

    // Buscar por ID
    public SowingDTO getById(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    // Actualizar
    public SowingDTO update(Long id, SowingDTO dto) {
        Sowing existing = repository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setSeedName(dto.getSeedName());
        existing.setQuantity(dto.getQuantity());
        existing.setStartDate(dto.getStartDate());
        existing.setHarvestDate(dto.getHarvestDate());
        existing.setObservations(dto.getObservations());
        existing.setFumigationFrequency(dto.getFumigationFrequency());
        existing.setStatus(dto.getStatus());

        return toDTO(repository.save(existing));
    }

    // Eliminar
    public boolean delete(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }

    private Sowing toEntity(SowingDTO dto) {
        Sowing s = new Sowing();
        s.setId(dto.getId());
        s.setSeedName(dto.getSeedName());
        s.setQuantity(dto.getQuantity());
        s.setStartDate(dto.getStartDate());
        s.setHarvestDate(dto.getHarvestDate());
        s.setObservations(dto.getObservations());
        s.setFumigationFrequency(dto.getFumigationFrequency());
        s.setStatus(dto.getStatus());
        return s;
    }

    private SowingDTO toDTO(Sowing s) {
        SowingDTO dto = new SowingDTO();
        dto.setId(s.getId());
        dto.setSeedName(s.getSeedName());
        dto.setQuantity(s.getQuantity());
        dto.setStartDate(s.getStartDate());
        dto.setHarvestDate(s.getHarvestDate());
        dto.setObservations(s.getObservations());
        dto.setFumigationFrequency(s.getFumigationFrequency());
        dto.setStatus(s.getStatus());
        return dto;
    }
}
