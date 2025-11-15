package com.improsvita.seedlings_service.controller;

import com.improsvita.seedlings_service.dto.SeedlingRequestDTO;
import com.improsvita.seedlings_service.dto.SeedlingResponseDTO;
import com.improsvita.seedlings_service.dto.SeedlingUpdateDTO;
import com.improsvita.seedlings_service.model.Seedling;
import com.improsvita.seedlings_service.service.SeedlingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/seedlings")
@RequiredArgsConstructor
public class SeedlingController {
    
    private final SeedlingService seedlingService;
    
    @PostMapping
    public ResponseEntity<SeedlingResponseDTO> createSeedling(@RequestBody SeedlingRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(seedlingService.createSeedling(request));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SeedlingResponseDTO> updateSeedling(@PathVariable Long id, 
                                                               @RequestBody SeedlingUpdateDTO updateDTO) {
        return ResponseEntity.ok(seedlingService.updateSeedling(id, updateDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeedling(@PathVariable Long id) {
        seedlingService.deleteSeedling(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SeedlingResponseDTO> getSeedlingById(@PathVariable Long id) {
        return ResponseEntity.ok(seedlingService.getSeedlingById(id));
    }
    
    @GetMapping
    public ResponseEntity<List<SeedlingResponseDTO>> getAllSeedlings() {
        return ResponseEntity.ok(seedlingService.getAllSeedlings());
    }
    
    @GetMapping("/sowing/{sowingId}")
    public ResponseEntity<List<SeedlingResponseDTO>> getSeedlingsBySowing(@PathVariable Long sowingId) {
        return ResponseEntity.ok(seedlingService.getSeedlingsBySowingId(sowingId));
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<SeedlingResponseDTO>> getSeedlingsByStatus(@PathVariable Seedling.SeedlingStatus status) {
        return ResponseEntity.ok(seedlingService.getSeedlingsByStatus(status));
    }
}