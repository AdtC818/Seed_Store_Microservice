package com.improsvita.seedlings_service.service;

import com.improsvita.seedlings_service.dto.SeedlingRequestDTO;
import com.improsvita.seedlings_service.dto.SeedlingResponseDTO;
import com.improsvita.seedlings_service.dto.SeedlingUpdateDTO;
import com.improsvita.seedlings_service.model.Seedling;
import com.improsvita.seedlings_service.repository.SeedlingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeedlingServiceImpl implements SeedlingService {
    
    private final SeedlingRepository seedlingRepository;
    
    @Override
    @Transactional
    public SeedlingResponseDTO createSeedling(SeedlingRequestDTO request) {
        Seedling seedling = new Seedling();
        seedling.setSowingId(request.getSowingId());
        seedling.setSeedType(request.getSeedType());
        seedling.setInitialQuantity(request.getInitialQuantity());
        seedling.setAvailableQuantity(request.getInitialQuantity());
        seedling.setReservedQuantity(0);
        seedling.setGenerationDate(LocalDate.now());
        seedling.setEstimatedReadyDate(request.getEstimatedReadyDate());
        seedling.setStatus(Seedling.SeedlingStatus.GROWING);
        seedling.setObservations(request.getObservations());
        
        Seedling saved = seedlingRepository.save(seedling);
        return mapToDTO(saved);
    }
    
    @Override
    @Transactional
    public SeedlingResponseDTO updateSeedling(Long id, SeedlingUpdateDTO updateDTO) {
        Seedling seedling = seedlingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plántula no encontrada"));
        
        if (updateDTO.getAvailableQuantity() != null) {
            if (updateDTO.getAvailableQuantity() < seedling.getReservedQuantity()) {
                throw new RuntimeException("No se puede reducir por debajo de reservas activas");
            }
            seedling.setAvailableQuantity(updateDTO.getAvailableQuantity());
        }
        
        if (updateDTO.getEstimatedReadyDate() != null) {
            seedling.setEstimatedReadyDate(updateDTO.getEstimatedReadyDate());
        }
        
        if (updateDTO.getStatus() != null) {
            seedling.setStatus(updateDTO.getStatus());
        }
        
        if (updateDTO.getObservations() != null) {
            seedling.setObservations(updateDTO.getObservations());
        }
        
        return mapToDTO(seedlingRepository.save(seedling));
    }
    
    @Override
    @Transactional
    public void deleteSeedling(Long id) {
        Seedling seedling = seedlingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plántula no encontrada"));
        
        if (seedling.getReservedQuantity() > 0) {
            throw new RuntimeException("No se puede eliminar: tiene reservas activas");
        }
        
        seedlingRepository.delete(seedling);
    }
    
    @Override
    public SeedlingResponseDTO getSeedlingById(Long id) {
        Seedling seedling = seedlingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plántula no encontrada"));
        return mapToDTO(seedling);
    }
    
    @Override
    public List<SeedlingResponseDTO> getAllSeedlings() {
        return seedlingRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<SeedlingResponseDTO> getSeedlingsBySowingId(Long sowingId) {
        return seedlingRepository.findBySowingId(sowingId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<SeedlingResponseDTO> getSeedlingsByStatus(Seedling.SeedlingStatus status) {
        return seedlingRepository.findByStatus(status).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    private SeedlingResponseDTO mapToDTO(Seedling seedling) {
        SeedlingResponseDTO dto = new SeedlingResponseDTO();
        dto.setId(seedling.getId());
        dto.setSowingId(seedling.getSowingId());
        dto.setSeedType(seedling.getSeedType());
        dto.setInitialQuantity(seedling.getInitialQuantity());
        dto.setAvailableQuantity(seedling.getAvailableQuantity());
        dto.setReservedQuantity(seedling.getReservedQuantity());
        dto.setGenerationDate(seedling.getGenerationDate());
        dto.setEstimatedReadyDate(seedling.getEstimatedReadyDate());
        dto.setStatus(seedling.getStatus());
        dto.setObservations(seedling.getObservations());
        dto.setCreatedAt(seedling.getCreatedAt());
        dto.setUpdatedAt(seedling.getUpdatedAt());
        return dto;
    }
}