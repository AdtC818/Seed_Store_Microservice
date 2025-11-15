package com.improsvita.seedlings_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeedlingRequestDTO {
    private Long sowingId;
    private String seedType;
    private Integer initialQuantity;
    private LocalDate estimatedReadyDate;
    private String observations;
}