package com.improsvita.seedlings_service.dto;

import com.improsvita.seedlings_service.model.Seedling;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeedlingResponseDTO {
    private Long id;
    private Long sowingId;
    private String seedType;
    private Integer initialQuantity;
    private Integer availableQuantity;
    private Integer reservedQuantity;
    private LocalDate generationDate;
    private LocalDate estimatedReadyDate;
    private Seedling.SeedlingStatus status;
    private String observations;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}