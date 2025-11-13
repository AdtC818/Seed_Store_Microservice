package com.improsvita.seeds_service.service;

import com.improsvita.seeds_service.model.Seed;
import com.improsvita.seeds_service.repository.SeedRepository;
import com.improsvita.seeds_service.dto.SeedRequestDTO;
import com.improsvita.seeds_service.dto.SeedResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeedService {

    private final SeedRepository repository;

    public SeedService(SeedRepository repository) {
        this.repository = repository;
    }

    private SeedResponseDTO mapToDTO(Seed seed) {
        SeedResponseDTO dto = new SeedResponseDTO();
        dto.setId(seed.getId());
        dto.setPlantName(seed.getPlantName());
        dto.setVariety(seed.getVariety());
        dto.setSupplier(seed.getSupplier());
        dto.setQuantity(seed.getQuantity());
        dto.setAcquisitionDate(seed.getAcquisitionDate());
        dto.setExpirationDate(seed.getExpirationDate());
        return dto;
    }

    private Seed mapToEntity(SeedRequestDTO dto) {
        return new Seed(null,
                dto.getPlantName(),
                dto.getVariety(),
                dto.getSupplier(),
                dto.getQuantity(),
                dto.getAcquisitionDate(),
                dto.getExpirationDate()
        );
    }

    public List<SeedResponseDTO> getAllSeeds() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public SeedResponseDTO getSeedById(Long id) {
        return repository.findById(id).map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Seed not found with ID " + id));
    }

    public SeedResponseDTO createSeed(SeedRequestDTO dto) {
        Seed seed = mapToEntity(dto);
        return mapToDTO(repository.save(seed));
    }

    public SeedResponseDTO updateSeed(Long id, SeedRequestDTO dto) {
        Seed updated = repository.findById(id).map(seed -> {
            seed.setPlantName(dto.getPlantName());
            seed.setVariety(dto.getVariety());
            seed.setSupplier(dto.getSupplier());
            seed.setQuantity(dto.getQuantity());
            seed.setAcquisitionDate(dto.getAcquisitionDate());
            seed.setExpirationDate(dto.getExpirationDate());
            return repository.save(seed);
        }).orElseThrow(() -> new RuntimeException("Seed not found with ID " + id));
        return mapToDTO(updated);
    }

    public void deleteSeed(Long id) {
        repository.deleteById(id);
    }
}