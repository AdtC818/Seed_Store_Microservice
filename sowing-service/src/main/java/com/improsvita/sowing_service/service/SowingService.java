package com.improsvita.sowing_service.service;

import com.improsvita.sowing_service.dto.SowingDTO;
import com.improsvita.sowing_service.model.Sowing;
import com.improsvita.sowing_service.repository.SowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SowingService {

    private final SowingRepository sowingRepository;

    public Sowing registerSowing(SowingDTO dto) {
        // Validaciones
        if(dto.getQuantity() <= 0) throw new IllegalArgumentException("La cantidad debe ser positiva");
        if(dto.getHarvestDate().isBefore(dto.getStartDate()))
            throw new IllegalArgumentException("La fecha de cosecha debe ser posterior a la fecha de inicio");

        Sowing sowing = new Sowing(
                null,
                dto.getSeedName(),
                dto.getQuantity(),
                dto.getStartDate(),
                dto.getHarvestDate(),
                dto.getStatus() != null ? dto.getStatus() : "Sembrada",
                dto.getObservations(),
                dto.getFumigationFrequency()
        );

        return sowingRepository.save(sowing);
    }

    public List<Sowing> getActiveSowings() {
        return sowingRepository.findByStatus("Sembrada");
    }

    public Optional<Sowing> updateSowingStatus(Long id, String newStatus) {
        return sowingRepository.findById(id).map(sowing -> {
            if(sowing.getStatus().equals("Finalizada")) 
                throw new IllegalStateException("No se puede modificar una siembra finalizada");

            // Validar transición de estados
            sowing.setStatus(newStatus);
            return sowingRepository.save(sowing);
        });
    }

    public List<Sowing> getAllSowings() {
        return sowingRepository.findAll();
    }
}
