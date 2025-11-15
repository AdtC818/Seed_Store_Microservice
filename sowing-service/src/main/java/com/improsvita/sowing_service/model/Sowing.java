package com.improsvita.sowing_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "siembras")
public class Sowing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seedName;        // tipo de semilla
    private Integer quantity;       // cantidad de semillas usadas
    private LocalDate startDate;    // fecha de inicio
    private LocalDate harvestDate;  // fecha estimada de cosecha
    private String status;          // Sembrada, En crecimiento, Lista para cosecha, Finalizada
    private String observations;    // observaciones adicionales
    private Integer fumigationFrequency; // frecuencia de fumigación
}
