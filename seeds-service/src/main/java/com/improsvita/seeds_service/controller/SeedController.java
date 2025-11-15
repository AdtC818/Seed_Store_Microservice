package com.improsvita.seeds_service.controller;

import com.improsvita.seeds_service.dto.SeedRequestDTO;
import com.improsvita.seeds_service.dto.SeedResponseDTO;
import com.improsvita.seeds_service.service.SeedService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seeds")
@CrossOrigin(origins = "*")
public class SeedController {

    private final SeedService service;

    public SeedController(SeedService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SeedResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAllSeeds());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeedResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSeedById(id));
    }

    @PostMapping
    public ResponseEntity<SeedResponseDTO> create(@RequestBody SeedRequestDTO dto) {
        return ResponseEntity.ok(service.createSeed(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeedResponseDTO> update(@PathVariable Long id, @RequestBody SeedRequestDTO dto) {
        return ResponseEntity.ok(service.updateSeed(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteSeed(id);
        return ResponseEntity.noContent().build();
    }
}