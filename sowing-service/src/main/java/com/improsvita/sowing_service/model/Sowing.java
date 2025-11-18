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

    private Long seedId;           // <-- ID de la semilla en seed-service
    private String seedName;       // nombre para mostrar (copia del seed service)
    private Integer quantity;      // cantidad de semillas usadas
    private LocalDate startDate;   // fecha de inicio
    private LocalDate harvestDate; // fecha estimada de cosecha
    private String status;         // Sembrada, En crecimiento, Lista para cosecha, Finalizada
    private String availabilityStatus; 
    private String observations;   // observaciones adicionales
    private Integer fumigationFrequency; // frecuencia de fumigación
    private Long contactId;      // ID del contacto remoto
    private String contactName;  // Guardamos una copia del nombre del contacto
}
