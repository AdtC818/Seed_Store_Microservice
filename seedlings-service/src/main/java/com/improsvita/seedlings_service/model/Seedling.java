package com.improsvita.seedlings_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "seedlings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seedling {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "sowing_id", nullable = false)
    private Long sowingId;
    
    @Column(name = "seed_type", nullable = false)
    private String seedType;
    
    @Column(name = "initial_quantity", nullable = false)
    private Integer initialQuantity;
    
    @Column(name = "available_quantity", nullable = false)
    private Integer availableQuantity;
    
    @Column(name = "reserved_quantity", nullable = false)
    private Integer reservedQuantity = 0;
    
    @Column(name = "generation_date", nullable = false)
    private LocalDate generationDate;
    
    @Column(name = "estimated_ready_date")
    private LocalDate estimatedReadyDate;
    
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private SeedlingStatus status = SeedlingStatus.GROWING;
    
    @Column(name = "observations", length = 500)
    private String observations;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (generationDate == null) {
            generationDate = LocalDate.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum SeedlingStatus {
        GROWING, READY, DEPLETED
    }
}