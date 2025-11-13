package com.improsvita.sowing_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SowingDTO {
    private String seedName;
    private Integer quantity;
    private LocalDate startDate;
    private LocalDate harvestDate;
    private String status;
    private String observations;
    private Integer fumigationFrequency;
}
