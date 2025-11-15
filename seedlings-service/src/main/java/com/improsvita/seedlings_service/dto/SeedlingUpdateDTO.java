package com.improsvita.seedlings_service.dto;

import com.improsvita.seedlings_service.model.Seedling;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeedlingUpdateDTO {
    private Integer availableQuantity;
    private LocalDate estimatedReadyDate;
    private Seedling.SeedlingStatus status;
    private String observations;
}