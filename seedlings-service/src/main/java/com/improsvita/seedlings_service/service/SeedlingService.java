package com.improsvita.seedlings_service.service;

import com.improsvita.seedlings_service.dto.SeedlingRequestDTO;
import com.improsvita.seedlings_service.dto.SeedlingResponseDTO;
import com.improsvita.seedlings_service.dto.SeedlingUpdateDTO;
import com.improsvita.seedlings_service.model.Seedling;
import java.util.List;

public interface SeedlingService {
    SeedlingResponseDTO createSeedling(SeedlingRequestDTO request);
    SeedlingResponseDTO updateSeedling(Long id, SeedlingUpdateDTO updateDTO);
    void deleteSeedling(Long id);
    SeedlingResponseDTO getSeedlingById(Long id);
    List<SeedlingResponseDTO> getAllSeedlings();
    List<SeedlingResponseDTO> getSeedlingsBySowingId(Long sowingId);
    List<SeedlingResponseDTO> getSeedlingsByStatus(Seedling.SeedlingStatus status);
}