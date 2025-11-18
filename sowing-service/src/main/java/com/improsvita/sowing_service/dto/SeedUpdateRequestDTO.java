package com.improsvita.sowing_service.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SeedUpdateRequestDTO {
    private String plantName;
    private String variety;
    private String supplier;
    private Integer quantity;
    private LocalDate acquisitionDate;
    private LocalDate expirationDate;
}
