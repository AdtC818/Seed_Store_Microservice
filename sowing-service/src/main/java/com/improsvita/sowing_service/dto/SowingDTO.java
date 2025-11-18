package com.improsvita.sowing_service.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SowingDTO {
    private Long id;
    private Long seedId;
    private String seedName;
    private Integer quantity;
    private LocalDate startDate;
    private LocalDate harvestDate;
    private String observations;
    private Integer fumigationFrequency;
    private String status;
    private Long contactId;
    private String contactName;
    private String availabilityStatus; 
}
